# Overview
The purpose of this document is to define the functional and non-functional requirements for the Personal Expense Tracker project. The system here is designed to help users manage their personal finances by allowing them to track expenses, view reports and securely manage their financial data. 

# Software Requirements
We will go through the functional and non functional requirements of the project.
## Functional Requirements
### User Authentication
| ID | Requirement |
| :-------------: | :----------: |
| FR1 | The system shall allow users to register using their name and email and create a strong password. |
| FR2 | The system shall support login using their email and password.  |
| FR3 | The system shall allow users to securely log out from their account. |
| FR4 | The system shall implement session expiration after 30 minutes of inactivity. |
| FR5 | The system shall allow users to be able to edit their profile information. |
| FR6 | The system shall provide error messages for invalid login attempts. |

### Income tracking
| ID | Requirement |
| :-------------: | :----------: |
| FR7 | The system shall allow users to add income with title,date, amount, and category. |
| FR8 | The system shall give authentication that all fields are required. |
| FR9 | The users shall view summary of income added on the page. |
| FR10 | The users shall be able to delete the income if needed. |
| FR11 | The system shall allow users to add notes to each income. |

### Expense Tracking
| ID | Requirement |
| :-------------: | :----------: |
| FR12 | The system shall allow users to add expenses manually with title,date, amount, and category. |
| FR13 | The system shall allow users to add a reference as notes (helpful in cases where the category is not pre-defined). |
| FR14 | The users shall be able to view summary of logged expenses. |
| FR15 | The system shall show a total of all the expenses for the user. |
| FR16 | The system shall allow users to delete the created expense. |

### Transaction and reporting
| ID | Requirement |
| :-------------: | :----------: |
| FR17 | The system shall allow users to filter transactions giving a start end and end date. |
| FR18 | The system shall give a graphical representation of income and expenses. |
| FR19 | The system shall give a summary of total balance using total income and total expense calculated on the dashboard. |
| FR20 | The system shall show recent history on the dashboard. |
| FR21 | The system shall show the minimum and maximum comparison for both expense and salary for easy understanding.  |

### User settings
| ID | Requirement |
| :-------------: | :----------: |
| FR22 | The system shall allow users to update their profile name. |
| FR23 | The system shall allow users to update their password. |
| FR24 | The system shall authenticate with the confirm password |
| FR25 | The system shall allow users to upload and update their profile photo. |
| FR26 | The system shall allow users to set their currency preferences. |


## Non-Functional Requirements
### User Interface and Experience
| ID | Requirement |
| :-------------: | :----------: |
| NFR1 | The system shall display expenses clearly with intuitive navigation. |
| NFR7 | The interface shall allow users to complete primary actions (e.g. logging an expense) within two steps. |
| NFR8 | The system shall maintain a consistent design language across all features.  |
| NFR9 | Error messages shall provide clear feedback without technical jargon. |
| NFR10 | The system shall allow users to navigate easily between pages. |

### Performance and Scalability
| ID | Requirement |
| :-------------: | :----------: |
| NFR6 | The system shall handle a growing number of users efficiently. |
| NFR7 | The average response time for any user action shall not exceed 5 seconds. |
| NFR8 | The system shall pre-load commonly used features to improve perceived speed. |
| NFR9 | The system shall scale to support additional users when traffic increases. |
| NFR10 | The system shall prioritize dashboard loading speed under standard conditions. |

### Security
| ID | Requirement |
| :-------------: | :----------: |
| NFR6 | The system shall encrypt all user data. |
| NFR7 | The system shall enforce strong password requirement for account security. |
| NFR8 | The system shall logout users after a 1hr of inactivity.  |
| NFR9 | Passwords shall be hashed before storing them in the database.  |
| NFR10 | The system shall implement basic protection against common security risks. |

### Data Privacy and Compliance
| ID | Requirement |
| :-------------: | :----------: |
| NFR6 | The system shall ensure that no unauthorized users should be able to bypass authentication. |
| NFR7 | The system shall ensure that sensitive user data is accessible only to authorized staff. |
| NFR8 | The system shall include a privacy policy to explain how user data is handled.  |
| NFR9 | The system shall comply with basic privacy regulations.  |
| NFR10 | The system shall log all user account actions for audit purposes. |

### Maintenance
| ID | Requirement |
| :-------------: | :----------: |
| NFR6 | The authentication system must be available 99.9% of the time. |
| NFR7 | All user data shall be backed up daily and stored securely. |
| NFR8 | Regular updates shall address bugs and improve user experience. |
| NFR9 | The system shall be notified of updates within the application. |
| NFR10 | Logs shall monitor system performance for issue diagnosis. |


# Change management plan
This document offers a thorough plan for integrating the Personal Expense Tracker application into a business setting, ensuring its smooth adoption by employees and seamless alignment with business operations.

In today’s fast-paced environment, managing personal finances has become a key part of an employee’s productivity and well-being. The Personal Expense Tracker allows users to organize, analyze, and manage their financial data efficiently. By empowering employees to track income and expenses, generate reports and view financial summaries, this tool not only supports financial health but also improves workplace focus and satisfaction.

## Scope
The Personal Expense Tracker is designed to simplify personal finance management for employees. It enables them to log income and expenses, track spending habits, and generate actionable reports. This application integrates easily into the corporate ecosystem, offering employees 24/7 access to manage their finances securely and effectively.

For smooth integration, training sessions and ongoing support will be provided to ensure adoption across all levels of the organization. The application is scalable to meet growing user demands and will align with the company’s existing security and performance standards.

## Training guidelines
To ensure employees can fully utilize the features of the Personal Expense Tracker, comprehensive training and support will be provided. The training materials and sessions will cover the following key topics:

### Setting Up the Application:
Creating a user profile and setting a strong password.
Logging into the application securely and understanding session expiration.

### Tracking Income and Expenses:
Adding income with title, date, category, and amount.
Logging expenses and attaching references (notes) for non-standard categories.
Viewing summaries of income and expenses and generating visual reports.

### Using Advanced Features:
Filtering transactions based on date ranges for detailed analysis.
Visualizing income and expense comparisons through graphical dashboards.
Updating profile information, including passwords, and setting currency preferences.

### Security and Maintenance:
Understanding account security features such as strong password enforcement, session timeouts, and encryption.
Basic troubleshooting steps for common issues like login problems or data discrepancies.

## Training Format:
### Interactive Demonstrations:
Conduct group training sessions to walk employees through the application’s core features.
Provide hands-on practice in a sandbox environment.

### Documentation:
Distribute user-friendly manuals and quick-start guides with step-by-step instructions.
#### Video Tutorials:
Create short videos for common tasks, such as logging expenses or generating reports, hosted on the company’s intranet.
#### Ongoing Support:
Regular Q&A sessions.
A dedicated helpdesk system for real-time user support.

## Integration Within the Ecosystem
The application is designed to integrate seamlessly into the company’s digital ecosystem without disrupting existing workflows.

### System Compatibility:
The application supports integration with corporate Single Sign-On (SSO) systems for a secure and streamlined login experience.
Data can be exported in standard formats for compatibility with other corporate tools such as accounting or financial planning software.

### Scalability and Performance:
The application will scale to accommodate growing user demand without affecting performance.
Critical dashboards and reports are optimized for fast loading, ensuring a seamless user experience.

### Customizations:
Custom reports, categories, and notifications can be configured to align with specific organizational needs.

## Options for Application Deployment
The company can choose from two deployment models based on their requirements:

### One-Time Purchase:
The application will be tailored to the company’s specifications and delivered as a standalone solution.
The organization will have full control over the maintenance and updates of the application.
Support Option: Maintenance and customer service can be provided periodically at a fixed fee.

### Subscription-Based Service:
The application will be hosted and maintained by our team, with 24/7 customer support.
This model includes regular updates, security patches, and customizations as needed.
The subscription eliminates the need for in-house maintenance, reducing overhead costs.

## Issue Management
To ensure smooth operation, any discovered issues will be resolved swiftly and efficiently:

### Real-Time Monitoring:
The system will include automated monitoring tools to track performance, identify errors, and notify the support team of potential issues.

### Customer Support:
Employees can report issues directly through the application via a built-in "Report Issue" feature.
All reports will be reviewed, and a resolution will be provided within the agreed service-level agreements:
Critical Issues will be resolved within 24 hours.
Non-Critical Issues: Addressed within 7 business days.

### Regular Maintenance:
Daily backups will ensure data integrity and security.
Updates will be deployed regularly to address bugs and improve user experience.

## Benefits to the Business
Integrating the Personal Expense Tracker into the corporate ecosystem will provide significant benefits:
### Improved Employee Productivity:
Financial peace of mind allows employees to focus better on their work.
Scalable and Secure Solution:
The application is designed to grow with the organization and maintain compliance with modern security standards.
### Cost Efficiency:
The subscription model eliminates the need for costly in-house infrastructure.
By providing employees with a reliable and intuitive tool for managing their finances, the company can foster a culture of trust, support, and efficiency.

# Traceability links
<Description of this section>
## Use Case Diagram Traceability
| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| UseCase1 | Move Player | FR5 |
| UseCase1 | Move Player | FR5 |
| UseCase1 | Move Player | FR5 |

## Class Diagram Traceability
| Artifact Name | Requirement ID |
| :-------------: |:----------: |
| classPlayer | NFR3, FR5 |
| classPlayer | NFR3, FR5 |
| classPlayer | NFR3, FR5 |

## Activity Diagram Traceability
<In this case, it makes more sense (I think, feel free to disagree) to link
to the file and to those requirements impacted>
| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| <filename> | Handle Player Input | FR1-5, NFR2 |
| <filename> | Handle Player Input | FR1-5, NFR2 |
| <filename> | Handle Player Input | FR1-5, NFR2 |

# Software Artifacts
This is the link to previous artifacts
* [Artifacts](https://github.com/AISHWARYA-D6581/GVSU-CIS-641-ANALYTICA/tree/main/artifacts)
