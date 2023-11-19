import React from "react";

import './ScreenCss/PrivacyPolicy.css'
import { Link } from 'react-router-dom';
function PrivacyPolicyScreen() {
  return (
    <div className="MainContainerForPrivacyScreen">
      <Link to='/LoginScreen'>
        <button className="privacy-backButton">Back to Login</button>
      </Link>
      <div style={{ textAlign: 'center' }}>
        <h1>
          <span style={{ fontWeight: 'bold', color: 'rgb(237, 82, 15)' }}>
            Privacy Statement for TechnoTreasure
          </span>
          <br />
          Last updated: 10/18/2023
        </h1>
      </div>


      <ul>
        At TechnoTreasure, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Statement explains how we collect, use, disclose, and safeguard your personal data. By using our website and services, you consent to the practices described in this statement.
      </ul>

      <h2>1. Information We Collect:</h2>
      <ul>
        <li>
          Personal Information:
          This may include your name, email address, phone number, billing and shipping addresses, and payment information.
        </li>
        <li>
          Usage Information: We may collect information about your interactions with our website, such as your IP address, browser type, and operating system.
        </li>
        <li>
          Cookies and Tracking Technologies: We use cookies and similar technologies to collect data about your browsing activity on our website for analytics and advertising purposes. You can manage your cookie preferences through your browser settings.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>
          Order Fulfillment: To process your orders, send order confirmations, and provide customer support.
        </li>
        <li>
          Account Maintenance: To manage your account, including providing access to your order history and personalized content.
        </li>
        <li>
          Marketing: To send you promotional materials, updates, and information about our products and services. You can opt-out of marketing communications at any time.
        </li>
        <li>
          Analytics: To analyze website traffic, monitor user behavior, and improve our website and services.
        </li>
      </ul>

      <h2>3. Information Sharing</h2>
      <ul>
        <li>
          Service Providers: We may share your information with third-party service providers that help us deliver our services, such as payment processors and shipping companies.
        </li>
        <li>
          Legal Compliance: We may disclose information in response to a legal request, if required by law, or to protect our rights and the rights of others.
        </li>
      </ul>

      <h2>4. Security</h2>
      <ul>
        <li>
          We take data security seriously and employ industry-standard measures to protect your personal information. However, no data transmission is completely secure, and we cannot guarantee the absolute security of your data.
        </li>
      </ul>

      <h2>5. Your Rights</h2>
      <ul>
        <li>
          You have certain rights regarding your personal information, including the right to access, correct, delete, or restrict the processing of your data. If you have any questions or requests related to your data, please contact us using the information below.
        </li>
      </ul>

      <h2>6. Changes to this Privacy Statement</h2>
      <ul>
        <li>
          We may update this Privacy Statement to reflect changes in our practices or for legal and regulatory reasons. Any changes will be posted on this page with an updated "last updated" date.

        </li>
      </ul>

      <h2>7. Contact Us</h2>
      <ul>
        <li>
        If you have any questions or concerns about this Privacy Statement or your personal information, please contact us at:
        <p>
          <strong>Email:  </strong>
          <a href="mailto:technotreasure@gmail.com">technotreasure@gmail.com</a>
        </p>
        <p>
          <strong>Phone:  </strong>
          <a href=" tel:+123-456-7890">+123-456-7890</a>
        </p>
        <p>
          <strong>Mailing Address:  </strong> 6803 Chase Hill Blvd, San Antonio, TX
        </p>
        
      </li>
    </ul>
    </div >
  );

}

export default PrivacyPolicyScreen;
