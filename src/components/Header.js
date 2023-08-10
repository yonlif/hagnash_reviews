import PropTypes from 'prop-types';
function Header({ text, bgColor, textColor }) {
const headerStyles = {
  backgroundColor: bgColor,
  color: textColor
};
return (
<header style={headerStyles}>
    <div className="container">
    <h1>{text}</h1>
   </div>
 </header>
 );
}
Header.defaultProps = {
  text: 'Hagnash reviews'
};
Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string
};
export default Header;