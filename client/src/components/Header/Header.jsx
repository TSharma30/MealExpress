import { useEffect } from 'react';
import gsap from 'gsap';
import './Header.css';

const Header = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
    .fromTo('.header h2', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
    .fromTo('.header p', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 }, '-=0.5')
    .fromTo('.header button', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2 }, '-=1');
}, []);
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Hungry? Satisfy Your Cravings with Just a Few Clicks!</h2>
        <p>Choose from a wide variety of your favorite dishes and have them delivered straight to your doorstep. Whether you're craving a quick snack or a gourmet meal, we've got you covered. Order now and enjoy delicious food from the comfort of your home!</p>
        <button className='header-button'>Get Started</button>
      </div>
    </div>
  );
}

export default Header;
