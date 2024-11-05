### CMSプロジェクト - React, Express, PostgreSQL, Material-UI

このプロジェクトは、Reactをフロントエンド、Expressをバックエンドに使用し、PostgreSQLをデータベースとしたコンテンツ管理システム（CMS）です。認証にはJWT (JSON Web Token) を採用し、管理者とユーザーの役割ごとにアクセス制御を行います。記事の作成・編集・削除、ユーザー管理など、豊富な機能を提供し、コンテンツ管理を簡単に行えるようにしています。

- **Demo：** <a href="https://react-express-postgresql-cms.vercel.app/">react-express-postgresql-cms.vercel.app</a>

### Screenshots

<img src="./frontend/screenshot/1.png" width="400"/><br/>
<img src="./frontend/screenshot/2.png" width="400"/><br/><br/>
<img src="./frontend/screenshot/3.png" width="400"/><br/><br/>
<img src="./frontend/screenshot/4.png" width="400"/><br/><br/>
<img src="./frontend/screenshot/5.png" width="400"/><br/><br/>
<img src="./frontend/screenshot/6.png" width="400"/><br/><br/>


### 技術スタック

- **フロントエンド**: React.js、TypeScript、Material-UI を使用し、Vercel にデプロイ。

- **バックエンド**: Node.js と Express.js を使用し、AWS EC2 にホスティング。

- **データベース**: Vercel の PostgreSQL を使用。

- **開発ツール**: Vite でビルド、npm で依存関係を管理。



### 主な機能

1. **ユーザー登録とログイン**
   - **JWT 認証**を使用したセキュアな認証システム。
   - ユーザーは新規登録、ログイン、ログアウトが可能。
   - **パスワードリセット機能**：メールを使ったパスワードリセットのサポート（近日追加予定）。

2. **記事管理**
   - **リッチテキストエディタ**を使用して、記事の作成・編集・削除が可能。
   - 記事には**タイトル、本文、カバー画像**、カテゴリ、タグ情報を含めることができる。
   - **ドラフト保存機能**：公開前に記事を保存して、後から編集可能。
   - 記事の**検索およびフィルタリング**が可能。

3. **カテゴリ管理**
   - カテゴリおよびサブカテゴリの作成・編集・削除が可能。
   - **ドラッグアンドドロップ**でカテゴリの並び替えが可能（近日追加予定）。

4. **タグ管理**
   - **タグの作成**：ユーザーは記事にタグを追加でき、コンテンツの検索性を向上させる。
   - **タグフィルタリング機能**で関連する記事を簡単に見つけることができる。

5. **認証と権限管理**
   - **管理者**と**一般ユーザー**の役割に応じてアクセス権限を制御。
   - 管理者は記事の管理やカテゴリ、タグの編集を行える一方、一般ユーザーは記事の閲覧とコメントが可能。

6. **ユーザー管理**
   - **管理者はユーザーの一覧表示**および編集が可能。
   - ユーザーの権限変更、削除ができる。

7. **ダッシュボード**
   - 管理者向けに、登録ユーザー数や公開された記事数、最近のアクティビティを表示。

### プロジェクト構成

#### フロントエンドディレクトリ構造

```
frontend/
├── src/
│   ├── components/         # Reactコンポーネント
│   ├── contexts/           # グローバルな状態管理（React Context API）
│   ├── pages/              # 各ページ（ログイン、記事管理、ダッシュボードなど）
│   ├── assets/             # 静的リソース（CSS、画像など）
│   └── App.js              # アプリケーションのエントリーポイント
├── public/                 # 公開ディレクトリ
└── package.json            # プロジェクト依存関係とスクリプト
```

#### バックエンドディレクトリ構造

```
backend/
├── controllers/            # ルートロジックを処理するコントローラ
├── models/                 # データベースモデル（PostgreSQLテーブル構造）
├── routes/                 # APIルート定義
├── middleware/             # 認証やエラーハンドリングのミドルウェア
├── config/                 # 環境変数やデータベースの接続設定
│   └── .env                # 設定ファイル（下記参照）
└── package.json            # プロジェクト依存関係とスクリプト
```

### 環境設定ファイル (.env)

以下は `.env` ファイルの設定例です。このファイルにバックエンドの環境変数を設定します。

```bash
POSTGRES_URL="postgres://your-username:your-password@your-hostname:5432/your-dbname"
POSTGRES_USER="your-username"
POSTGRES_PASSWORD="your-password"
POSTGRES_DATABASE="your-dbname"
POSTGRES_HOST="your-hostname"
JWT_KEY="your-jwt-secret"        # JWT認証に使用するシークレットキー
ADMIN_USER="admin"               # 管理者ユーザー名
ADMIN_PASSWORD="admin123"        # 管理者パスワード

```

### 使用方法

#### バックエンド

1. 必要な依存関係をインストール：
```bash
cd backend
npm install
```

2. データベースに接続し、サーバーを起動：
```bash
npm run dev
```

#### フロントエンド

1. 必要な依存関係をインストール：
```bash
cd frontend
npm install
```

2. 開発サーバーを起動：
```bash
npm run dev
```

### アクセス方法

フロントエンドは `http://localhost:3000` でアクセス可能です。バックエンドAPIは `http://localhost:5000/api` で動作しています。

### データベースの初期セットアップ

PostgreSQL データベースをローカルまたはリモートに作成し、`.env` ファイルの `POSTGRES_URL` および `POSTGRES_*` 設定を更新してください。

### 最新の機能更新

1. **パスワードリセット機能**：
   - ユーザーは登録したメールアドレスを使用して、パスワードをリセットできます。

2. **タグ機能**：
   - タグを使用して、記事の分類や検索性を向上させることができます。

3. **ドラフト記事保存**：
   - 公開前に記事を下書きとして保存し、後で編集・公開できます。

4. **コメント機能（近日追加）**：
   - ユーザーは記事にコメントを残せる機能が追加される予定です。

