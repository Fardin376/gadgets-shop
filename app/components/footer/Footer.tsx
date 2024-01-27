import Link from 'next/link';
import Container from '../Container';
import FooterList from './FooterList';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { menuItems } from '@/utils/utils';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footerLinks">
          <FooterList>
            <h5 className="footerListHeader">Shop By Categories</h5>
            {menuItems.map((item, index) =>
              index > 1 ? (
                <div key={item.id}>
                  <Link
                    color={index === 1 ? 'primary' : 'foreground'}
                    className="w-full"
                    href={item.path}
                  >
                    {item.label}
                  </Link>
                </div>
              ) : null
            )}
          </FooterList>

          <FooterList>
            <h5 className="footerListHeader">Customer Service</h5>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Customer Testimonials</Link>
            <Link href="#">FAQs</Link>
          </FooterList>

          <FooterList>
            <h5 className="footerListHeader">About Us</h5>
            <p className="footerParagraph">
              Our store is dedicated to providing the latest and greatest
              devices and accessories to our customers, with a wide range of
              different electronic products
            </p>
            <p className="footerParagraph">
              &copy; {new Date().getFullYear()} Gadget Galore. All rights
              reserved
            </p>
          </FooterList>

          <FooterList>
            <h5 className="footerListHeader">Follow Us</h5>
            <div className="footerSocial">
              <Link href="#">
                <FaFacebook size={30} />
              </Link>
              <Link href="#">
                <FaTwitter size={30} />
              </Link>
              <Link href="#">
                <FaInstagram size={30} />
              </Link>
              <Link href="#">
                <FaYoutube size={30} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
