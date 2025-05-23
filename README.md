# 🔐 Encrypted URL Shortener

A privacy-first, secure URL shortener built with **Next.js** and **Appwrite**.  
Unlike traditional services, this app **encrypts URLs** before storing them — ensuring that plain URLs are **never saved** in the database. Plus, each user can shorten URLs up to **10 times per day**.

## 🚀 Features

- ✅ **Encrypted Storage**: Original URLs are encrypted client-side before being sent to the backend.
- 🔒 **Zero-knowledge**: Appwrite never sees or stores the raw URLs.
- 📦 **Built with Next.js**: Fast, modern React-based frontend.
- ⚙️ **Appwrite Backend**: Robust, open-source backend-as-a-service for user auth, database, and rate limiting.
- 📈 **Rate Limiting**: Users are limited to 10 shortened URLs per day.
- 🎨 **Minimal UI**: Simple and clean interface for a focused experience.

## 📸 Live

![appshortener](https://appshorten.bitecode.my.id/) <!-- Optional: Add screenshot image in your repo -->

## 🛠️ Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Appwrite](https://appwrite.io/)
- **Crypto**: `crypto.subtle` Web API (AES, RSA, etc.)
- **Database**: Appwrite's built-in database service

## 📦 Setup

### Prerequisites

- Node.js (v18 or higher)
- Appwrite instance (self-hosted or cloud)
- Environment variables configured

### 1. Clone this repo

```bash
git clone https://github.com/yourusername/encrypted-url-shortener.git
cd encrypted-url-shortener
