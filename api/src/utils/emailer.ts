import AWS from 'aws-sdk';

interface Email {
  to: string;
  subject: string;
  message: string;
};

interface Params {
  Source: string;
  Destination: {
    ToAddresses: string[]
  },
  Message: {
    Subject: {
      Data: string
    }
  },
  Body: {
    Text: {
      Data: string
    }
  }
}


const ses = new AWS.SES({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.SECRET
});

// export const sendEmail = async (attrs: Email) => {

//   const params = {
//     Source: 'wolcenterprise@gmail.com',
//     Destination: {
//       ToAddresses: [attrs.to]
//     },
//     Message: {
//       Subject: {
//         Data: attrs.subject
//       },
//       Body: {
//         Text: {
//           Data: attrs.message
//         }
//       }
//     }

//   };

//   try {
//     const result = await ses.sendEmail(params).promise();
//     console.log('Email sent!', result)
//   } catch (err) {
//     console.error('Error Sending email', err)
//   }

// };


class EmailService {
  private ses: AWS.SES;
  public to: string;
  public name: string;

  constructor(to: string, name: string) {
    this.ses = new AWS.SES({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.SECRET,
    });

    this.to = to
    this.name = name
  };



  public async sendWelcome() {
    const params = {
      Source: 'wolcenterprise@gmail.com',
      Destination: {
        ToAddresses: [this.to]
      },
      Message: {
        Subject: {
          Data: "Welcome to FoneToHome"
        },
        Body: {
          Text: {
            Data: `Dear ${this.name}, we welcome you in high prestige to Fone to Home`
          }
        }
      }

    };

    try {
      const result = await ses.sendEmail(params).promise();
      console.log('Email sent!', result)
      return result
    } catch (err) {
      console.error('Error Sending email', err)
    }
  };

  public async sendPasswordReset(link: string) {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    const params = {
      Source: 'wolcenterprise@gmail.com',
      Destination: {
        ToAddresses: [this.to]
      },
      Message: {
        Subject: {
          Data: 'Password Reset'
        },
        Body: {
          Text: {
            Data: `Dear ${this.name} we got a password reset request from you, at ${now.toLocaleDateString('en-US')} if you did not perform this action please ignore but if you did click the link below ${link}`

          }
        }
      }

    };

    try {
      const result = await ses.sendEmail(params).promise();
      console.log('Email sent!', result)
      return result
    } catch (err) {
      console.error('Error Sending email', err)
    }
  }


  public async apartmentFound() {

    const params = {
      Source: 'wolcenterprise@gmail.com',
      Destination: {
        ToAddresses: [this.to]
      },
      Message: {
        Subject: {
          Data: "Apatments Found"
        },
        Body: {
          Text: {
            Data: `Hello ${this.name}, This is to inform you that we got an Apartment for you check it out! Go to Your profile and check
             https://fonetohome.com/my-profile`
          }
        }
      }

    };

    try {
      const result = await ses.sendEmail(params).promise();
      console.log('Email sent!', result)
      return result
    } catch (err) {
      console.error('Error Sending email', err)
    }
  }
};

export { EmailService as Emailer }