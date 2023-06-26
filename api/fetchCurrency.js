const fetchCurrency = async (count, from, to) => {
    let response = await fetch(`https://api.coinpaprika.com/v1/price-converter?base_currency_id=${from}&quote_currency_id=${to}&amount=${count}`)
    if (!response.ok) {
        const message = `Error status: ${response.status}`;
        throw new Error(message);
    }

    const currency = await response.json();
    return currency;
}

export { fetchCurrency };