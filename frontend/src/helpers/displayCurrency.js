const displayINRCurrency = (num) => {
     const fromatter = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : 'INR',
        minimumFractionDigits : 2
     })

     return fromatter.format(num)
}

export default displayINRCurrency