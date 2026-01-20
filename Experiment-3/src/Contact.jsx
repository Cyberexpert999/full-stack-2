export default function Contact() {
  return (
    <div style={{ padding: "20px" }}>
      <h1> Contact Us</h1>

      <p>
        If you have any questions about this project or React routing, feel free
        to contact us using the information below.
      </p>

      <h3> Contact Information:</h3>
      <ul>
        <li><b>Name:</b> Arif Billah</li>
        <li><b>Email:</b> arif@gmail.com</li>
        <li><b>Phone:</b> +91-7001204869</li>
        <li><b>Location:</b> India</li>
      </ul>

      <h3>Purpose of This Page:</h3>
      <p>
        This page demonstrates how a separate component can be loaded using
        routing without refreshing the browser.
      </p>

      <h3> Future Improvements:</h3>
      <ul>
        <li>Add a contact form</li>
        <li>Connect with backend</li>
        <li>Send messages to email</li>
      </ul>
    </div>
  );
}
