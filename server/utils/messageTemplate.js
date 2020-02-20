import moment from 'moment';

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

  static transactionMessage({ firstName, lastName },
    {
      accountNumber, amount, createdOn, newBalance, type
    }) {
    const transactionDate = moment(createdOn).format('DD-MMM-YYYY');
    const transactionTime = moment(createdOn).format('HH:mm');
    const amountFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });

    const balance = amountFormat.format(newBalance);
    // eslint-disable-next-line no-param-reassign
    amount = amountFormat.format(amount);

    return `<p>Dear ${lastName.toUpperCase()}, ${firstName.toUpperCase()}</p>
    <p>We wish to inform you that a ${type} transaction occurred on your account with us.
    <br/>The details of this transaction are shown below:</p>
    <p><strong><u>Transaction Notification</u></strong></p>
    <p>Account Number : ${accountNumber}</p>
    <p>Amount : ${amount}</p>
    <p>Value Date : ${transactionDate}</p>
    <p>Time of Transaction : ${transactionTime}</p>
    <p>The balances on this account as at  ${transactionTime}  are as follows;</p>
    <p>Current Balance :  ${balance}<br/>
    Available Balance : ${balance}</p>
  `;
  }
}

export default messageTemplate;
