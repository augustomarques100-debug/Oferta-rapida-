# Instalar o APK da V1.2 no seu celular

## Caminho mais fácil

Você precisa de um computador com internet para gerar o APK pela primeira vez. O APK será criado pelo EAS Build.

### 1. Instale Node.js
Instale Node.js LTS no computador.

### 2. Abra o terminal dentro da pasta mobile

Entre em:
`oferta_rapida_V1_2/mobile`

### 3. Instale as dependências
`npm install`

### 4. Instale o EAS CLI
`npm install --global eas-cli`

### 5. Crie/entre na conta Expo
`eas login`

Se não tiver conta, o comando orienta a criação.

### 6. Gere o APK
`eas build --platform android --profile preview`

Quando terminar, o EAS mostrará a página do build e o botão/link para instalar o APK. A documentação oficial do Expo confirma que o perfil APK pode ser instalado diretamente em um aparelho Android.

### 7. Instale no celular
Abra o link do APK no celular, baixe e instale. Se o Android pedir permissão para instalar de uma fonte externa, permita para o navegador/gerenciador usado.

## Para a versão da Play Store

Depois dos testes:
`eas build --platform android --profile production`

Essa versão gera AAB, formato recomendado para publicação na Google Play.

## Requisitos atuais

Para novos aplicativos e atualizações na Google Play a partir de 31/08/2026, o app deve mirar Android 16 / API 36 ou superior. A V1.2 já está planejada para esse alvo.

## O que falta para ser uma operação real

- API/backend em produção
- catálogo real de marketplaces
- imagens oficiais dos produtos
- login e assinaturas
- pagamento
- WhatsApp Business Platform
- política de privacidade/termos
- publicação na Google Play

Não coloque tokens, senhas ou chaves de API no código do aplicativo.
