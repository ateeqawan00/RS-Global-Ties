import { TailSpin } from "react-loader-spinner"

const Loader = () => {
  return (
    <>
      <TailSpin
        visible={true}
        height='80'
        width='80'
        color='#127CC0'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </>
  )
}
export default Loader
