import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useFinancialStore, Asset } from './financialStore';

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;

interface CrisisScreenProps {
	displayAssets: Asset[];
}

const CrisisScreen = ({ displayAssets }: CrisisScreenProps) => {
	const navigate = useNavigate();
	const { savings, monthlyIncome, monthlyExpenses, completedScenarios, sellAssets, revertLastChoice, language } =
		useFinancialStore();

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	const surplus = monthlyIncome - monthlyExpenses;
	const deficit = Math.abs(surplus);
	const monthsUntilBroke = deficit > 0 ? Math.floor(savings / deficit) : Infinity;

	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	const toggleAsset = (type: string) =>
		setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

	const selectedAssets = displayAssets.filter((a) => selectedTypes.includes(a.type));
	const totalProceeds = selectedAssets.reduce((sum, a) => sum + a.value, 0);
	const savingsAfterSelling = savings + totalProceeds;
	const monthsAfterSelling = deficit > 0 ? Math.floor(savingsAfterSelling / deficit) : Infinity;

	const handleSell = () => {
		if (selectedAssets.length === 0) return;
		sellAssets(selectedAssets.map((a) => ({ type: a.type, amount: a.value })));
		setSelectedTypes([]);
	};

	const handleGoBack = () => {
		revertLastChoice();
		navigate('/financial-literacy/scenario');
	};

	const canGoBack = completedScenarios.length > 0;

	return (
		<div className="min-h-screen bg-[#1a0505] flex flex-col">
			{/* Crisis header */}
			<div className="bg-[#7f1d1d] border-b border-red-900 px-4 py-4">
				<div className="max-w-2xl mx-auto flex items-start gap-3">
					<AlertTriangle className="text-red-300 flex-shrink-0 mt-0.5" size={22} />
					<div>
						<h1 className="text-red-100 font-bold text-lg">
							{t('Financial Crisis', 'ಆರ್ಥಿಕ ಸಂಕಟ')}
						</h1>
						<p className="text-red-200 text-sm mt-1">
							{t(
								`Your expenses exceed your income by ${fmt(deficit)}/month. At this rate, your savings will run out in ${monthsUntilBroke} month${monthsUntilBroke === 1 ? '' : 's'}.`,
								`ನಿಮ್ಮ ಖರ್ಚು ಆದಾಯಕ್ಕಿಂತ ${fmt(deficit)}/ತಿಂಗಳು ಹೆಚ್ಚು. ಇದೇ ಗತಿಯಲ್ಲಿ ${monthsUntilBroke} ತಿಂಗಳಲ್ಲಿ ಉಳಿತಾಯ ಮುಗಿಯುತ್ತದೆ.`,
							)}
						</p>
						<p className="text-red-300/80 text-sm mt-0.5">
							{t(`Current savings: ${fmt(savings)}`, `ಪ್ರಸ್ತುತ ಉಳಿತಾಯ: ${fmt(savings)}`)}
						</p>
					</div>
				</div>
			</div>

			{/* Options */}
			<div className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-4">
				{/* Option 1: Sell Assets */}
				<div className="bg-[#2a0a0a] border border-red-900/50 rounded-xl p-4">
					<h2 className="text-red-200 font-semibold text-base mb-1">
						{t('Option 1: Sell Assets', 'ಆಯ್ಕೆ 1: ಆಸ್ತಿ ಮಾರಿ')}
					</h2>
					<p className="text-red-300/70 text-sm mb-3">
						{t(
							'Select one or more assets to sell. The proceeds are added to your savings.',
							'ಮಾರಲು ಒಂದು ಅಥವಾ ಹೆಚ್ಚು ಆಸ್ತಿ ಆಯ್ಕೆ ಮಾಡಿ. ಮೊತ್ತ ಉಳಿತಾಯಕ್ಕೆ ಸೇರುತ್ತದೆ.',
						)}
					</p>

					{displayAssets.length === 0 ? (
						<p className="text-red-400/80 text-sm italic py-2">
							{t('You have no assets to sell.', 'ಮಾರಲು ಯಾವುದೇ ಆಸ್ತಿ ಇಲ್ಲ.')}
						</p>
					) : (
						<div className="space-y-2">
							{displayAssets.map((asset) => (
								<label
									key={asset.type}
									className="flex items-center gap-3 p-3 rounded-lg bg-[#3a1010] cursor-pointer hover:bg-[#4a1818] transition-colors"
								>
									<input
										type="checkbox"
										checked={selectedTypes.includes(asset.type)}
										onChange={() => toggleAsset(asset.type)}
										className="w-4 h-4 accent-red-500 flex-shrink-0"
									/>
									<span className="flex-1 text-red-100 text-sm">{asset.label}</span>
									<span className="text-red-300 text-sm font-medium tabular-nums">
										{fmt(asset.value)}
									</span>
								</label>
							))}
						</div>
					)}

					{selectedTypes.length > 0 && (
						<div className="mt-3 p-3 bg-[#1a1200] rounded-lg border border-amber-900/40">
							<p className="text-amber-300 text-sm font-medium">
								{t(`Total proceeds: ${fmt(totalProceeds)}`, `ಒಟ್ಟು ಮೊತ್ತ: ${fmt(totalProceeds)}`)}
							</p>
							<p className="text-amber-400/70 text-xs mt-1">
								{t(
									`Savings after selling: ${fmt(savingsAfterSelling)} — covers ${monthsAfterSelling} more month${monthsAfterSelling === 1 ? '' : 's'} of deficit.`,
									`ಮಾರಿದ ನಂತರ ಉಳಿತಾಯ: ${fmt(savingsAfterSelling)} — ${monthsAfterSelling} ತಿಂಗಳ ಕೊರತೆ ಭರಿಸಬಹುದು.`,
								)}
							</p>
						</div>
					)}

					<button
						onClick={handleSell}
						disabled={selectedTypes.length === 0}
						className="mt-3 w-full py-2.5 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
					>
						{t('Sell Selected Assets', 'ಆಯ್ಕೆ ಮಾಡಿದ ಆಸ್ತಿ ಮಾರಿ')}
					</button>
				</div>

				{/* Option 2: Go Back */}
				<div className="bg-[#0a150a] border border-green-900/40 rounded-xl p-4">
					<h2 className="text-green-300 font-semibold text-base mb-1">
						{t('Option 2: Go Back', 'ಆಯ್ಕೆ 2: ಹಿಂದೆ ಹೋಗಿ')}
					</h2>
					<p className="text-green-400/70 text-sm mb-3">
						{t(
							'Undo your last decision and choose a different path.',
							'ಕೊನೆಯ ನಿರ್ಧಾರ ರದ್ದು ಮಾಡಿ ಬೇರೆ ಮಾರ್ಗ ಆರಿಸಿ.',
						)}
					</p>
					<button
						onClick={handleGoBack}
						disabled={!canGoBack}
						className="w-full py-2.5 rounded-lg bg-green-900 hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
					>
						<ArrowLeft size={16} />
						{t('Go Back to Previous Decision', 'ಹಿಂದಿನ ನಿರ್ಧಾರಕ್ಕೆ ಹಿಂದೆ ಹೋಗಿ')}
					</button>
					{!canGoBack && (
						<p className="text-green-700 text-xs mt-2 text-center">
							{t('No previous decision to undo.', 'ರದ್ದು ಮಾಡಲು ಹಿಂದಿನ ನಿರ್ಧಾರ ಇಲ್ಲ.')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CrisisScreen;
