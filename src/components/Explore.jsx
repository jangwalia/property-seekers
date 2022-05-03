import{ Link } from 'react-router-dom';
import rentImage from '../assets/property_images/for_rent.jpeg'
import sellImage from '../assets/property_images/for_sale.jpg'

export default function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore Listings</p>
      </header>
      <main>
        {/*slider*/}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/categories/rent'>
            <img src={rentImage} alt="property for rent" className='exploreCategoryImg' />
            <p className="exploreCategoryname">Property For Rent</p>
          </Link>
          <Link to='/categories/sale'>
            <img src={sellImage} alt="property for sale" className='exploreCategoryImg' />
            <p className="exploreCategoryname">Property For Sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}