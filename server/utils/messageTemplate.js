class messageTemplate {
  static staffCreated({ email, password }) {
    return `<p>Dear Sir/Madam,</p>
    <p>Kindly use the credentials in this mail to login to your account</p>
    <ul>
      <li>Email: ${email}</li>
      <li>Password: ${password}</li>
    </ul>
    <p>Manager Operations,<br/>
    KUDI BANK, Nigeria.</p>
  `;
  }
}

export default messageTemplate;
