import json from "@/data/currencyData"

export default function SelectCurrency({ nameSelect, selectedValue }) {
    return <>
        <label htmlFor="">
            <span>{nameSelect}</span>
            <select name={nameSelect} id={nameSelect} defaultValue={selectedValue}>
                {json.map((item, index) => {
                    return (
                        <option key={index} value={item.value} >{item.name}</option>
                    )
                })}
            </select>
        </label>
    </>
}