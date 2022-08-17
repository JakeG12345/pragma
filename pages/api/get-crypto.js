export default function getCryptoHandler(req, res) {
  const getData = async () => {
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=15&CMC_PRO_API_KEY=b1e07853-6fd3-4af7-8d5c-6b334df7bc0a`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      )
      const data = await response.json()

      res.status(200).json({data})
    } catch (error) {
      console.log(error)
    }
  }

  getData()
}
