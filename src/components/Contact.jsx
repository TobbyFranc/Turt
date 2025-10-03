import globe from '../assets/blackglobe.png'

const Contact = () => {
  return (
    <div className='w-full flex justify-between '>
        <div className=""></div>
        <img src={globe} alt=""  className='w-1/2 animate-earth-spin '/>
    </div>
  )
}

export default Contact