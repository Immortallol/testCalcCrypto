import { fetchCurrency } from "@/api/fetchCurrency";
import SelectCurrency from "@/components/selectCurrency";
import { useState } from "react";
import styles from '@/styles/Main.module.scss';

function MainPage(props) {

    const [currency, setCurrency] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchCurrency(e.currentTarget.count.value, e.currentTarget.currencyFrom.value, e.currentTarget.currencyTo.value)
            .then(currency => { setCurrency(currency); setError(null) })
            .catch(error => setError(error));
    }
    return <>
        <section className={styles.section}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    <span>Count value</span>
                    <input type="text" name='count' defaultValue={props.defaultCount} />
                </label>
                <SelectCurrency nameSelect={'currencyFrom'} selectedValue={props.currencyFrom} />
                <SelectCurrency nameSelect={'currencyTo'} selectedValue={props.currencyTo} />
                <div >
                    {currency ? <div className={styles.currencyBox}>
                        <span>{currency.base_currency_name}</span>
                        <span>to</span>
                        <span>{currency.quote_currency_name}</span>
                        <div>{currency.price}</div>
                    </div> : <div className={styles.currencyBox}>
                        <span>{props.data.base_currency_name}</span>
                        <span>to</span>
                        <span>{props.data.quote_currency_name}</span>
                        <div>{props.data.price}</div>
                    </div>}
                </div>

                <div className={styles.error}>{error?.message}</div>
                <button type="submit">Submit</button>
            </form>
        </section>
    </>
}

export async function getServerSideProps() {
    const defaultCount = 1;
    const currencyFrom = 'btc-bitcoin';
    const currencyTo = 'eth-ethereum';
    const data = await fetchCurrency(defaultCount, currencyFrom, currencyTo);
    return { props: { data, defaultCount, currencyFrom, currencyTo } }
}

export default MainPage;