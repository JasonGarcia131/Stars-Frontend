function Select(props) {

    const {value, setHoroscopeSign} = props;
    
    const horoscopeSigns = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]

    //maps through the array and sets the option value equal to the element of the index.
    const mappedOptions = horoscopeSigns.map((sign,i) => {
        return <option value={sign} key={i}>
            {sign.toUpperCase()}
        </option>
    })

    //sets the options.
    return (
        <select id="selectHoroscope" value={value} onChange={(e) => setHoroscopeSign(e.target.value)}>
            <option>Choose your sign</option>
            {mappedOptions}
        </select>
    )
}

export default Select