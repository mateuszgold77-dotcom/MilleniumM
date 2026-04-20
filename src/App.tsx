import { useState } from 'react';
import './App.css';

// Icons as inline SVGs
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

const RadioCheckedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#10b981"/></svg>
);

const RadioUncheckedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
);

// Types
interface Option {
  name: string;
  barrels: number;
  unitPrice: number;
  purchaseAmount: number;
  profit: number;
}

const investmentOptions: Option[] = [
  {
    name: 'BRENT',
    barrels: 35,
    unitPrice: 78.82,
    purchaseAmount: 2758.70,
    profit: 2320.47,
  },
  {
    name: 'BRENT+',
    barrels: 50,
    unitPrice: 78.82,
    purchaseAmount: 3941.00,
    profit: 3110.55,
  },
  {
    name: 'BRENT MAX',
    barrels: 75,
    unitPrice: 78.82,
    purchaseAmount: 5911.50,
    profit: 5290.37,
  },
];

// Exchange rates
const exchangeRates = {
  usdToPln: 3.6084,
  eurToPln: 4.2141,
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'clientData' | 'options' | 'payment' | 'summary'>('login');
  const [clientName, setClientName] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'PLN'>('USD');

  const balance = 833.71;

  const handleLogin = () => {
    if (clientName.trim()) {
      setCurrentScreen('clientData');
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const getTopUpAmount = () => {
    if (selectedOption === null) return 0;
    const purchaseAmount = investmentOptions[selectedOption].purchaseAmount;
    return Math.max(0, purchaseAmount - balance);
  };

  const getConvertedAmount = () => {
    const topUp = getTopUpAmount();
    if (selectedCurrency === 'PLN') {
      return (topUp * exchangeRates.usdToPln).toFixed(2);
    }
    if (selectedCurrency === 'EUR') {
      return (topUp * exchangeRates.usdToPln / exchangeRates.eurToPln).toFixed(2);
    }
    return topUp.toFixed(2);
  };

  // LOGIN SCREEN
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-[#1a2436]/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-4">
              <ShieldIcon />
              <span className="text-sm font-medium tracking-wide uppercase">STREFA ZABEZPIECZONA SSL</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Strefa Inwestora</h1>
            <p className="text-gray-400 text-sm">Wprowadz swoje dane, aby uzyskac dostep do oferty</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Imie i nazwisko</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <UserIcon />
              </div>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Wprowadz imie i nazwisko"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mb-6"
          >
            <LockIcon />
            Zaloguj sie
          </button>

          <div className="text-center text-gray-500 text-xs space-y-1">
            <p>Polaczenie szyfrowane 256-bit AES</p>
            <p>System zabezpieczony • SSL Encryption • PCI DSS Compliant</p>
          </div>
        </div>
      </div>
    );
  }

  // CLIENT DATA SCREEN
  if (currentScreen === 'clientData') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-[#1a2436]/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-4">
              <CheckIcon />
              <span className="text-sm font-medium">Zweryfikowany</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Dane klienta</h1>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">KLIENT:</p>
              <p className="text-white font-semibold">{clientName || 'Ireneusz Krawczyk'}</p>
            </div>

            <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">SPOLKA INWESTYCYJNA</p>
              <p className="text-white font-semibold">CB Trust</p>
              <p className="text-gray-400 text-sm mt-1">CB TRUST AG, Zug, Schweiz</p>
              <p className="text-gray-500 text-xs mt-1">Licence: CHE-104.067.038</p>
              <p className="text-gray-500 text-xs">Baarerstrasse 55, CH-6302 Zug</p>
            </div>

            <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">EKSPERT PROWADZACY</p>
              <p className="text-white font-semibold">Mateusz Jankowski</p>
              <p className="text-gray-400 text-sm mt-1">Numer wpisu do KNF: 744</p>
              <p className="text-gray-400 text-sm">Licencja wazna od: 06.06.2019 r.</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('options')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Dalej
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    );
  }

  // OPTIONS SCREEN
  if (currentScreen === 'options') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs uppercase mb-1">KLIENT</p>
            <h1 className="text-2xl font-bold text-white">{clientName || 'Ireneusz Krawczyk'}</h1>
          </div>

          {/* Balance */}
          <div className="bg-[#1a2436]/80 border border-gray-700/50 rounded-lg p-4 mb-6">
            <p className="text-gray-400 text-sm mb-1">Bilans konta inwestycyjnego:</p>
            <p className="text-emerald-400 text-2xl font-bold">$ {balance.toFixed(2)}</p>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-1">Oferta zakupu jednostek ropy naftowej</h2>
          <p className="text-gray-400 text-sm mb-2">Liczba dostepnych opcji: <span className="text-emerald-400">1 opcja max</span></p>
          <p className="text-white font-medium mb-4">Wybierz opcje inwestycyjna</p>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {investmentOptions.map((opt, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`bg-[#1a2436]/80 border rounded-xl p-6 cursor-pointer transition-all ${
                  selectedOption === index
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  {opt.name === 'BRENT MAX' && (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <StarIcon />
                    </div>
                  )}
                  <h3 className={`text-lg font-bold mb-3 ${opt.name === 'BRENT MAX' ? 'text-amber-400' : 'text-white'}`}>
                    {opt.name === 'BRENT MAX' && <span className="mr-1">★</span>}
                    {opt.name}
                    {opt.name === 'BRENT MAX' && <span className="ml-1">★</span>}
                  </h3>
                  <p className="text-3xl font-bold text-white mb-1">{opt.barrels}</p>
                  <p className="text-gray-400 text-sm mb-4">Barylek ropy</p>

                  <div className="border-t border-gray-700 pt-3 mb-3">
                    <p className="text-gray-400 text-xs mb-1">Cena za jednostke:</p>
                    <p className="text-white font-semibold">${opt.unitPrice.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-700 pt-3 mb-3">
                    <p className="text-gray-400 text-xs mb-1">Kwota zakupu:</p>
                    <p className="text-emerald-400 font-semibold">${opt.purchaseAmount.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <p className="text-gray-400 text-xs mb-1">Zysk po sprzedazy:</p>
                    <p className="text-emerald-400 text-2xl font-bold">${opt.profit.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          {selectedOption !== null && (
            <div className="flex justify-center">
              <button
                onClick={() => setCurrentScreen('payment')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-12 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Dalej
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // PAYMENT SCREEN
  if (currentScreen === 'payment' && selectedOption !== null) {
    const option = investmentOptions[selectedOption];
    const topUpAmount = getTopUpAmount();

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
        <div className="max-w-[520px] mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setCurrentScreen('options')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon />
            Wroc
          </button>

          <div className="bg-[#1a2436]/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h1 className="text-xl font-bold text-white text-center mb-6">Dane platnosci</h1>

            <div className="space-y-3 mb-6">
              {/* Client */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-1">DANE KLIENTA</p>
                <p className="text-white font-semibold">{clientName || 'Ireneusz Krawczyk'}</p>
              </div>

              {/* Selected Option */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-1">WYBRANA OPCJA</p>
                <p className="text-white font-bold text-lg">{option.name}</p>
                <p className="text-gray-400 text-sm">{option.barrels} barylek ropy</p>
              </div>

              {/* Purchase Amount */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-1">KWOTA ZAKUPU</p>
                <p className="text-emerald-400 text-2xl font-bold">${option.purchaseAmount.toFixed(2)} USD</p>
              </div>

              {/* Top-up Amount */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-1">KWOTA DO DOINWESTOWANIA</p>
                <p className="text-gray-400 text-sm mb-2">(Odliczono obecny bilans: ${balance.toFixed(2)})</p>
                <p className="text-amber-400 text-xl font-bold">${topUpAmount.toFixed(2)} USD</p>
              </div>

              {/* Currency Selection */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-3">WYBIERZ WALUTE WPLATY</p>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCurrency('USD')}>
                    {selectedCurrency === 'USD' ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
                    <span className="text-white">USD</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCurrency('EUR')}>
                    {selectedCurrency === 'EUR' ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
                    <span className="text-white">EUR</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCurrency('PLN')}>
                    {selectedCurrency === 'PLN' ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
                    <span className="text-white">PLN</span>
                  </label>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-gray-400 text-sm mb-2">Kwota do wplaty w wybranej walucie:</p>
                  <div className="flex items-center gap-2">
                    <WalletIcon />
                    <span className="text-emerald-400 text-xl font-bold">{getConvertedAmount()} {selectedCurrency}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Kurs PKO BP: 1 USD = {exchangeRates.usdToPln} PLN | 1 EUR = {exchangeRates.eurToPln} PLN
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('summary')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Dalej
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUMMARY SCREEN
  if (currentScreen === 'summary' && selectedOption !== null) {
    const option = investmentOptions[selectedOption];
    const topUpAmount = getTopUpAmount();

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
        <div className="max-w-[520px] mx-auto">
          <div className="bg-[#1a2436]/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <CheckCircleIcon />
              </div>
              <h1 className="text-xl font-bold text-white mb-3">Podsumowanie</h1>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 inline-flex items-center gap-2">
                <CheckIcon />
                <span className="text-emerald-400 text-sm font-medium">Twoja opcja kontraktu zostala zarezerwowana</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {/* Client */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-1">DANE KLIENTA</p>
                <p className="text-white font-semibold">{clientName || 'Ireneusz Krawczyk'}</p>
              </div>

              {/* Selected Option */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-1">WYBRANA OPCJA</p>
                <p className="text-white font-bold text-lg mb-3">{option.name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Barylki:</p>
                    <p className="text-white font-semibold">{option.barrels}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Kwota zakupu:</p>
                    <p className="text-emerald-400 font-semibold">${option.purchaseAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Oczekiwany zysk:</p>
                    <p className="text-emerald-400 font-semibold">${option.profit.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Waluta wplaty:</p>
                    <p className="text-white font-semibold">{selectedCurrency}</p>
                  </div>
                </div>
              </div>

              {/* Amount to Pay */}
              <div className="bg-[#0f172a]/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase mb-2">KWOTA DO WPLATY</p>
                <p className="text-emerald-400 text-3xl font-bold mb-1">{getConvertedAmount()} {selectedCurrency}</p>
                <p className="text-gray-500 text-sm">(odpowiednik ${topUpAmount.toFixed(2)} USD)</p>
              </div>

              {/* Deadline - CHANGED TO APRIL 21, 2026 17:30 CET */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="text-amber-400 mt-0.5">
                    <ClockIcon />
                  </div>
                  <div>
                    <p className="text-amber-300 text-sm">
                      <span className="font-bold">Wazne:</span> Dokonaj wplaty w terminie do
                    </p>
                    <p className="text-amber-400 font-bold text-lg mt-1">21 kwietnia 2026 r. godz. 17:30 CET</p>
                  </div>
                </div>
              </div>

              <div className="text-center text-gray-400 text-sm space-y-1 pt-2">
                <p>Twoje dane zostaly zapisane.</p>
                <p>Opcja kontraktu jest zarezerwowana.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentScreen('login');
                setClientName('');
                setSelectedOption(null);
                setSelectedCurrency('USD');
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <CheckIcon />
              Gotowe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
