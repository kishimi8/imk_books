<div align="center" markdown="1">
<br/>

<img src="https://kishimi8.io/files/books.png" alt="IMK Books logo" width="80"/>

<br/>

<h1>IMK Books</h1>

**Modern Accounting Made Simple (iOS Fork)**

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/kishimi8/books)](https://github.com/kishimi8/books/releases)
![Platforms](https://img.shields.io/badge/platform-ios%2C%20mac%2C%20windows%2C%20linux-yellowgreen)
[![Publish](https://github.com/kishimi8/books/actions/workflows/publish.yml/badge.svg)](https://github.com/kishimi8/books/actions/workflows/publish.yml)

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/29507195/207267857-4ae48890-3fb2-4046-80cf-3256b46c72a0.png" alt="IMK Books Preview"/>
</div>
<br />
<div align="center">
	<a href="https://kishimi8.io/books">Website</a>
	-
	<a href="https://docs.kishimi8.io/books">Documentation</a>
</div>

## About

**IMK Books** is a fork of [Frappe Books](https://frappe.io/books) specifically adapted for **iOS Mobile Devices**.

While retaining the core simplicity and power of the original desktop application, this fork introduces a new mobile-first data layer (using Capacitor SQLite) and responsive UI adaptations to bring modern accounting to your iPad and iPhone.

> **Credit**: This project is built upon the excellent work of the [Frappe](https://frappe.io) team. We are grateful for their open-source contributions. You can find the original repository at [github.com/frappe/books](https://github.com/frappe/books).

## Key Features (iOS Fork)

- **Mobile Support**: Fully functional on iOS devices.
- **Offline First**: Uses local SQLite storage on your device, ensuring data privacy and offline capability.
- **Responsive UI**: Adapted specifically for touch interfaces and smaller screens.
- **Core Accounting**: Retains all the powerful double-entry accounting, invoicing, and reporting features of Frappe Books.

---

## Original Frappe Books Description

Frappe Books is an open-source accounting software aimed at simplifying financial management for businesses. With its clean and user-friendly interface, it streamlines accounting tasks for small and medium-sized enterprises, offering a seamless solution for modern businesses to manage their finances with ease.

<details>
<summary>Screenshots</summary>
<br/>
<img  alt="Pos" src="https://github.com/user-attachments/assets/f75116b4-cf5f-45ee-9927-ba380fa56a46" />
    <br/><br/>
    <img  alt="General Ledger" src="https://github.com/user-attachments/assets/58d8bcdf-1576-4008-b010-7054fb64a12d" />
    <br/><br/>
    <img  alt="Profit and Loss" src="https://github.com/user-attachments/assets/11bd67d1-d808-496b-ac4d-ef68c18b9419" />

</details>

### Motivation

Frappe Books addresses a market gap where small businesses face expensive, complex accounting tools. It offers an intuitive, open-source solution that combines simplicity with essential features, empowering businesses to manage finances effectively—even offline.

### Key Features

- **Dashboard**: Provides an overview of key financial data and performance metrics.
- **Point of Sale**: Simplifies retail transactions with an integrated POS system for easy sales processing.
- **Works Offline**: Enables users to continue working without an internet connection and sync later.
- **Double-entry accounting**: Ensures accurate financial tracking by recording each transaction in two accounts.
- **Entries**
  - **Invoicing**: Allows businesses to create and manage professional invoices effortlessly.
  - **Billing**: Billing processes by generating bills and tracking payments.
  - **Payments**: Records and tracks payments received and made.
  - **Journal Entries**: Records financial transactions in the general ledger with detailed notes and adjustments.
- **Financial Reports**
  - **General Ledger**: Centralized record of all financial transactions, providing a comprehensive view of accounts.
  - **Profit and Loss Statement**: Summarizes revenues, costs, and expenses to show business profitability.
  - **Balance Sheet**: Displays a company’s assets, liabilities, and equity at a specific point in time.
  - **Trial Balance**: Verifies the accuracy of accounting records by ensuring that debits and credits are balanced.
    <br/>

### Under the Hood

- **Vue.js**: Vue.js powers the front-end, enabling a reactive and component-based UI. It ensures seamless interactions and dynamic updates, giving users a modern, responsive experience.

- **Electron**: Electron is used to package the desktop version application, allowing it to run offline and provide a native-like experience across Windows, macOS, and Linux.

- **SQLite**: Local database. All financial data, transactions, and configurations are stored securely in an SQLite file on the user's machine (or device sandbox on iOS).

## Development Setup (iOS)

### Pre-requisites

1. Node.js `v20+`
2. `npm` or `yarn`
3. Xcode (for iOS compilation)
4. Capacitor CLI

### Clone and Run

```bash
# clone the repository
git clone https://github.com/kishimi8/imk_books.git

# change directory
cd books

# install dependencies
yarn

# Run desktop dev
yarn dev

# Sync Capacitor
npx cap sync

# Open in Xcode
npx cap open ios
```

## Contributing

If you want to contribute to this iOS fork, please feel free to fork this repo and raise a PR.

For contributions to the core desktop logic or accounting features, please consider contributing upstream to [Frappe Books](https://github.com/frappe/books).

---

## License

This project is licensed under the same terms as Frappe Books. See the [LICENSE](LICENSE) file for details.
