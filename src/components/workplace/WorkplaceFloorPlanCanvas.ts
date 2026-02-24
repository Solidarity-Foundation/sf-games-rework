import { Application, Graphics, Text, TextStyle, Container } from 'pixi.js';
import { ROOM_SEQUENCE, DECORATIVE_ROOMS } from './roomConfig';
import type { Language } from './workplaceStore';

// Isometric tile dimensions
const TILE_W = 80;
const TILE_H = 40;

function toIso(gx: number, gy: number): { x: number; y: number } {
  return {
    x: (gx - gy) * (TILE_W / 2),
    y: (gx + gy) * (TILE_H / 2),
  };
}

function isoCorners(
  gx: number,
  gy: number,
  gw: number,
  gh: number
): [number, number, number, number, number, number, number, number] {
  const tl = toIso(gx, gy);
  const tr = toIso(gx + gw, gy);
  const br = toIso(gx + gw, gy + gh);
  const bl = toIso(gx, gy + gh);
  return [tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y];
}

function isoCenter(gx: number, gy: number, gw: number, gh: number): { x: number; y: number } {
  return toIso(gx + gw / 2, gy + gh / 2);
}

function hexToNum(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}

function darken(hex: string, amount = 0.3): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (
    (Math.round(r * (1 - amount)) << 16) |
    (Math.round(g * (1 - amount)) << 8) |
    Math.round(b * (1 - amount))
  );
}

export interface CanvasCallbacks {
  onRoomClick: (roomId: string) => void;
}

export interface CanvasState {
  currentRoomIndex: number;
  completedRooms: string[];
  language: Language;
}

let app: Application | null = null;
let appReady = false; // only true after app.init() resolves
let glowTickerFn: (() => void) | null = null;
let currentState: CanvasState = { currentRoomIndex: 0, completedRooms: [], language: 'en' };
let currentCallbacks: CanvasCallbacks = { onRoomClick: () => {} };
let resizeObserver: ResizeObserver | null = null;

export async function initFloorPlanCanvas(
  container: HTMLDivElement,
  cb: CanvasCallbacks
): Promise<() => void> {
  currentCallbacks = cb;

  app = new Application();

  // Use explicit size instead of resizeTo to avoid destroy errors
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;

  await app.init({
    width: w,
    height: h,
    background: 0xdce8f5,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  // Guard: container may have been removed (StrictMode unmount) before init finished
  if (!container.isConnected) {
    try { app.destroy(true, { children: true }); } catch { /* ignore */ }
    app = null;
    return () => {};
  }

  container.appendChild(app.canvas as HTMLCanvasElement);
  appReady = true;

  // Resize canvas when container changes size
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      if (app && appReady && width > 0 && height > 0) {
        app.renderer.resize(width, height);
        drawFloorPlan();
      }
    }
  });
  resizeObserver.observe(container);

  drawFloorPlan();

  return () => {
    destroyFloorPlanCanvas();
  };
}

export function updateFloorPlanCanvas(state: CanvasState) {
  currentState = state;
  if (!app || !appReady) return; // init not done yet — drawFloorPlan() will use currentState when ready
  drawFloorPlan();
}

export function destroyFloorPlanCanvas() {
  appReady = false;

  if (glowTickerFn && app) {
    try { app.ticker.remove(glowTickerFn); } catch { /* ignore */ }
    glowTickerFn = null;
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  if (app) {
    try { app.destroy(true, { children: true }); } catch { /* ignore */ }
    app = null;
  }
}

function drawFloorPlan() {
  if (!app || !appReady) return;

  app.stage.removeChildren();
  if (glowTickerFn) {
    try { app.ticker.remove(glowTickerFn); } catch { /* ignore */ }
    glowTickerFn = null;
  }

  const { currentRoomIndex, completedRooms, language } = currentState;

  // Compute bounding box to center the layout
  const allRooms = [...ROOM_SEQUENCE, ...DECORATIVE_ROOMS];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const room of allRooms) {
    const corners = isoCorners(room.gridX, room.gridY, room.gridW, room.gridH);
    for (let i = 0; i < corners.length; i += 2) {
      minX = Math.min(minX, corners[i]);
      maxX = Math.max(maxX, corners[i]);
      minY = Math.min(minY, corners[i + 1]);
      maxY = Math.max(maxY, corners[i + 1]);
    }
  }

  const layoutW = maxX - minX;
  const layoutH = maxY - minY;
  const padding = 48;
  const scaleX = (app.screen.width - padding * 2) / layoutW;
  const scaleY = (app.screen.height - padding * 2) / layoutH;
  const scale = Math.min(scaleX, scaleY, 1.4);

  const offsetX = (app.screen.width - layoutW * scale) / 2 - minX * scale;
  const offsetY = (app.screen.height - layoutH * scale) / 2 - minY * scale;

  const master = new Container();
  master.x = offsetX;
  master.y = offsetY;
  master.scale.set(scale);
  app.stage.addChild(master);

  // Floor background
  const floor = new Graphics();
  const gxMin = Math.min(...allRooms.map(r => r.gridX)) - 0.5;
  const gyMin = Math.min(...allRooms.map(r => r.gridY)) - 0.5;
  const gxMax = Math.max(...allRooms.map(r => r.gridX + r.gridW)) + 0.5;
  const gyMax = Math.max(...allRooms.map(r => r.gridY + r.gridH)) + 0.5;
  floor.poly(isoCorners(gxMin, gyMin, gxMax - gxMin, gyMax - gyMin)).fill({ color: 0xeef4f9 });
  master.addChild(floor);

  // Decorative rooms
  for (const room of DECORATIVE_ROOMS) {
    master.addChild(
      buildRoomContainer({
        name: language === 'kan' ? room.name_kan : room.name,
        corners: isoCorners(room.gridX, room.gridY, room.gridW, room.gridH),
        center: isoCenter(room.gridX, room.gridY, room.gridW, room.gridH),
        color: room.color,
        state: 'decorative',
      })
    );
  }

  // Interactive rooms
  const currentRoom = ROOM_SEQUENCE[currentRoomIndex];
  let glowGfx: Graphics | null = null;

  for (const room of ROOM_SEQUENCE) {
    const isCompleted = completedRooms.includes(room.id);
    const isCurrent = room.id === currentRoom?.id;
    const roomState = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

    const c = buildRoomContainer({
      name: language === 'kan' ? room.name_kan : room.name,
      corners: isoCorners(room.gridX, room.gridY, room.gridW, room.gridH),
      center: isoCenter(room.gridX, room.gridY, room.gridW, room.gridH),
      color: room.color,
      state: roomState,
      onClick: isCurrent ? () => currentCallbacks.onRoomClick(room.id) : undefined,
    });

    master.addChild(c);

    if (isCurrent) {
      const found = c.getChildByLabel('glow') as Graphics | null;
      if (found) glowGfx = found;
    }
  }

  // Pulse glow on current room
  if (glowGfx && app) {
    const g = glowGfx;
    let t = 0;
    glowTickerFn = () => {
      t += 0.05;
      g.alpha = 0.3 + Math.sin(t) * 0.22;
    };
    app.ticker.add(glowTickerFn);
  }
}

interface BuildRoomOptions {
  name: string;
  corners: [number, number, number, number, number, number, number, number];
  center: { x: number; y: number };
  color: string;
  state: 'locked' | 'current' | 'completed' | 'decorative';
  onClick?: () => void;
}

function buildRoomContainer(opts: BuildRoomOptions): Container {
  const { corners, center, color, state, onClick, name } = opts;
  const c = new Container();

  const fillColor = state === 'locked' ? 0xcccccc : hexToNum(color);
  const alpha = state === 'locked' ? 0.45 : 1.0;
  const strokeColor = darken(state === 'locked' ? '#cccccc' : color, 0.25);
  const wallH = 14;

  // Glow halo for current room
  if (state === 'current') {
    const glow = new Graphics();
    glow.label = 'glow';
    glow.poly(expandCorners(corners, 8)).fill({ color: 0x5bafd8, alpha: 0.5 });
    c.addChild(glow);
  }

  // Floor face
  const face = new Graphics();
  face.poly(corners).fill({ color: fillColor, alpha });
  face.poly(corners).stroke({ color: strokeColor, width: 1.5, alpha: 0.8 });
  c.addChild(face);

  // Left wall (SW edge, bottom-left → top-left with depth)
  const wallL = new Graphics();
  wallL
    .poly([corners[0], corners[1], corners[6], corners[7], corners[6], corners[7] + wallH, corners[0], corners[1] + wallH])
    .fill({ color: darken(state === 'locked' ? '#cccccc' : color, 0.18), alpha: alpha * 0.75 })
    .stroke({ color: strokeColor, width: 1, alpha: 0.5 });
  c.addChild(wallL);

  // Right wall (SE edge, bottom-right → bottom-left with depth)
  const wallR = new Graphics();
  wallR
    .poly([corners[4], corners[5], corners[6], corners[7], corners[6], corners[7] + wallH, corners[4], corners[5] + wallH])
    .fill({ color: darken(state === 'locked' ? '#cccccc' : color, 0.10), alpha: alpha * 0.85 })
    .stroke({ color: strokeColor, width: 1, alpha: 0.5 });
  c.addChild(wallR);

  // Completed: green checkmark
  if (state === 'completed') {
    const s = 14;
    const cx = center.x, cy = center.y - 6;
    const check = new Graphics();
    check
      .moveTo(cx - s, cy)
      .lineTo(cx - s * 0.15, cy + s * 0.7)
      .lineTo(cx + s, cy - s * 0.7)
      .stroke({ color: 0x15803d, width: 4, cap: 'round', join: 'round' });
    c.addChild(check);
  }

  // Locked: simple padlock shape
  if (state === 'locked') {
    const cx = center.x, cy = center.y;
    const lock = new Graphics();
    lock.arc(cx, cy - 8, 6, Math.PI, 0, false).stroke({ color: 0x888888, width: 2.5, cap: 'round' });
    lock.rect(cx - 7, cy - 4, 14, 10).fill({ color: 0xaaaaaa, alpha: 0.9 });
    c.addChild(lock);
  }

  // Current: small dot above room
  if (state === 'current') {
    const dot = new Graphics();
    dot.circle(center.x, center.y - 22, 5).fill({ color: 0x3b6fa0 });
    c.addChild(dot);
  }

  // Label
  const labelStyle = new TextStyle({
    fontSize: state === 'locked' ? 8 : 9,
    fontFamily: 'sans-serif',
    fontWeight: state === 'locked' ? '400' : '700',
    fill: state === 'locked' ? '#999999' : '#1e3a5f',
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 80,
  });
  const label = new Text({ text: name, style: labelStyle });
  label.anchor.set(0.5, 0.5);
  label.x = center.x;
  label.y = state === 'completed' ? center.y + 14 : center.y + 6;
  c.addChild(label);

  // Interactivity
  if (onClick) {
    c.eventMode = 'static';
    c.cursor = 'pointer';
    c.on('pointerdown', onClick);
    c.on('pointerover', () => { face.alpha = 0.8; });
    c.on('pointerout', () => { face.alpha = 1; });
  }

  return c;
}

function expandCorners(
  corners: [number, number, number, number, number, number, number, number],
  amount: number
): number[] {
  const cx = (corners[0] + corners[2] + corners[4] + corners[6]) / 4;
  const cy = (corners[1] + corners[3] + corners[5] + corners[7]) / 4;
  const result: number[] = [];
  for (let i = 0; i < corners.length; i += 2) {
    const dx = corners[i] - cx;
    const dy = corners[i + 1] - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    result.push(corners[i] + (dx / len) * amount, corners[i + 1] + (dy / len) * amount);
  }
  return result;
}
