import Navbar from "../../../components/navbar/navbar";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./interchange.css";
import btcIcon from "../../../assets/btc.svg";
import dollarIcon from "../../../assets/dollar.svg";
import tetherIcon from "../../../assets/tether.svg";
import usdcIcon from "../../../assets/usdc.svg";
import $ from "../../../assets/$.svg";
import GetMultiPrices from "../../../services/getMultiPrices";
import { PricesContext } from "../../../context/pricesContext";
import { TransContext } from "../../../context/transContext";
import { useNavigate } from "react-router-dom";
import GetPricesRate from "../../../services/getRate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import GetBalance from "../../../services/getBalance";


const options = [
  { value: "USD", label: <img src={usdcIcon} alt="USD" />, icon: dollarIcon },
  { value: "BTC", label: <img src={btcIcon} alt="BTC" />, icon: btcIcon },
  {
    value: "USDT",
    label: <img src={tetherIcon} alt="USDT" />,
    icon: tetherIcon,
  },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 90,
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  menu: (provided) => ({
    ...provided,
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: state.isFocused ? "transparent" : "transparent",
    color: "inherit",
    "&:hover": {
      backgroundColor: "#05BCB9",
      borderRadius: "10px",
    },
  }),
};

const Interchange = () => {
  const { GetPricesData } = GetMultiPrices();
  const { usd, setUSD, usdt, setUSDT, btc, setBTC } = useContext(PricesContext);
  const {setOrigin,setFinal,setAmount,setRate,setFromAmountResume} = useContext(TransContext);
  const { GetRateData } = GetPricesRate();
  const [selectedFrom, setSelectedFrom] = useState("BTC");
  const [selectedTo, setSelectedTo] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState(0);
  const { GetBalancesData } = GetBalance();
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [balance, setBalance] = useState({});

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPrices = async () => {
      const data = await GetPricesData();
      setUSD(data.usd);
      setBTC(data.btc);
      setUSDT(data.usdt);

      console.log("valor de dolar es ", usd);
    };

    fetchPrices();
  }, []);

  const calculateReceiveAmount = (amount, fromCurrency, toCurrency) => {
    if (!usd || !btc || !usdt) return 0;
    let conversionRate = 1;

    if (fromCurrency === "BTC" && toCurrency === "USDT") {
      conversionRate = btc.usdt_sell;
    } else if (fromCurrency === "BTC" && toCurrency === "USD") {
      conversionRate = btc.usd_sell;
    } else if (fromCurrency === "USDT" && toCurrency === "BTC") {
      conversionRate = usdt.btc_sell;
    } else if (fromCurrency === "USD" && toCurrency === "BTC") {
      conversionRate = 1 / btc.usd_sell;
    } else if (fromCurrency === "USDT" && toCurrency === "USD") {
      conversionRate = usdt.usd_sell;
    } else if (fromCurrency === "USD" && toCurrency === "USDT") {
      conversionRate = 1 / usd.usdt_sell;
    }

    const calculatedAmount = amount * conversionRate;
    return isNaN(calculatedAmount) ? 0 : calculatedAmount;
  };

  useEffect(() => {
    // setFromAmount(0);
    setToAmount(0);
  }, [selectedTo]);

  useEffect(() => {
    const calculatedAmount = calculateReceiveAmount(
      fromAmount,
      selectedFrom,
      selectedTo
    );
    if (!isNaN(calculatedAmount) && calculatedAmount !== toAmount) {
      setToAmount(calculatedAmount);
    }
  }, [fromAmount, selectedFrom, selectedTo]);

  

  useEffect(() => {
    setOrigin(selectedFrom);
    setFromAmountResume(fromAmount);
    setAmount(fromAmount);
    setFinal(selectedTo);
    setAmount(fromAmount);
  }, [fromAmount, selectedFrom, setOrigin, setAmount, setFinal, selectedTo, setFromAmountResume]);


  useEffect(() => {
    if (selectedFrom === "BTC" && parseFloat(fromAmount) < 0.0004) {
      setFromAmount("0.0004");
    }
  }, [selectedFrom, fromAmount]);

  const notify = () => {
    toast.error("El monto a recibir no puede ser 0.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const fetchProfileBalances = async () => {
      setLoadingBalance(true);
      const data = await GetBalancesData();
      setBalance(data.balances);
      setLoadingBalance(false);
    };
    fetchProfileBalances();
  }, [selectedFrom]);


  const handleContinue = async () => {
    if (!fromAmount || fromAmount === 0) {
      notify(); 
      return;
    }

    const availableBalance = parseFloat(balance[selectedFrom.toLowerCase()]) || 0;
    if (parseFloat(fromAmount) > availableBalance) {
      toast.error("El monto a intercambiar excede al saldo actual", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }



    setOrigin(selectedFrom);
    setFinal(selectedTo);
    setAmount(fromAmount);

    const transactionData = {
      fromCurrency: selectedFrom,
      toCurrency: selectedTo,
      fromAmount,
      toAmount,
    };
    localStorage.setItem("transactionData", JSON.stringify(transactionData));
    
    await GetRateData();
    const valorRate = transactionData.toAmount / transactionData.fromAmount;
    setRate(valorRate);

    navigate("/resume");
  };

  return (
    <div className="interchange">
      <Navbar />
      <div className="changer">
        <div className="titles">
          <h1 className="h1">¿Qué deseas intercambiar?</h1>
          <h2>
          <h2>
              Saldo disponible: {loadingBalance ? "Cargando..." : (balance[selectedFrom.toLowerCase()] || 0) + " " + selectedFrom}
            </h2>

          </h2>
        </div>

        <div className="inputs-balance">
          <form>
            <h3 className="subs">Monto a Intercambiar</h3>
            <div className="input-direction ">
              <Select
                options={options}
                styles={customStyles}
                value={options.find((option) => option.value === selectedFrom)}
                onChange={(e) => setSelectedFrom(e.value)}
              />

              <div className="input-icon-container">
                <span className="input-icon">
                  <img src={$} alt="$" width="24" height="24" />
                </span>
                <input
                  type="number"
                  placeholder="0.0000"
                  className="input-amount"
                  min={selectedFrom === "BTC" ? "0.0004" : "0.0001"}
                  step="0.0001"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(parseFloat(e.target.value) || 0)}
                  />
              </div>
            </div>
            <h3 className="subs">Quiero recibir</h3>
            <div className="input-direction ">
              <Select
                options={options}
                styles={customStyles}
                value={options.find((option) => option.value === selectedTo)}
                onChange={(e) => setSelectedTo(e.value)}
              />
              <input
                type="number"
                placeholder="0.000"
                className="input-noIcon"
                min="0.0001"
                step="0.0001"
                value={toAmount}
                readOnly
              />
            </div>
          
          <div className="footerNav">
            <button className="back">Atras</button>
            <button type="button" className="next" onClick={handleContinue}>
              Continuar
            </button>
            <ToastContainer
              position="bottom-right"
              // autoClose={5000}
              autoClose={99999999999}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Interchange;
