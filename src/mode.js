const mode= "DEV"
// const mode= "prod"
const baseDomain = {
    "DEV": "http://192.168.1.77:7000/",
    "prod":""
  }
  
  export default function baseUrl(relativePath) {
      return new URL(relativePath, baseDomain[mode]).toString()
  }