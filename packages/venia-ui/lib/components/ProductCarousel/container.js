import { connect } from '@magento/venia-drivers';
import ProductCarousel from './productCarousel';
import { addItemToCart } from '../../actions/cart';

const mapStateToProps = ({ cart }) => ({
    cart
})
const mapDispatchToProps = {
    addItemToCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCarousel);
