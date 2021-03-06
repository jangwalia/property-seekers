import{ Link } from 'react-router-dom';
import rentImage from '../assets/property_images/for_rent.jpeg'
import sellImage from '../assets/property_images/for_sale.jpg'
import Homeslider from './Homeslider';
import './Explore.css'


export default function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>FEATURED LISTINGS</p>
      </header>
      <main>
        <Homeslider/>
        <div className="headingBox">
          <h1 className="exploreCategoryHeading">Looking to...</h1>
        </div>
        <div className="exploreCategories">
          <Link to='/categories/rent'>
            <img src={rentImage} alt="property for rent" className='exploreCategoryImg' />
            <div className="image__overlay">
              <p className="exploreCategoryname-rent">RENT</p>
            </div>
          </Link>
          <Link to='/categories/sale'>
            <img src={sellImage} alt="property for sale" className='exploreCategoryImg' />
            <div className="image__overlay">
            <p className="exploreCategoryname-buy">BUY</p>
            </div>
          </Link>
        </div>

      </main>
    </div>
  )
}