import React from 'react'
import { deepmergeAll, UIEvent, PhotoEditorSDKUI } from 'photoeditorsdk'

export class PhotoEditorSDK extends React.Component {
    config = {
        container: '#editor',
        image: './example.jpg', // Image url or Image path relative to assets folder
        license: '{"api_token":"c7OYtP2BYIjYn2OX0A653Q","app_identifiers":["localhost"],"available_actions":[],"domains":["https://api.photoeditorsdk.com"],"enterprise_license":false,"expires_at":1603756800,"features":["camera","library","export","customassets","whitelabel","focus","textdesign","transform","brush","text","frame","overlay","sticker","adjustment","filter"],"issued_at":1601188903,"minimum_sdk_version":"1.0","owner":"Test test","platform":"HTML5","products":["pesdk"],"version":"2.4","signature":"hY+Y0ECiz1RaxxIK4yJwrAAIRDM9vA3zZecih4oHcSus1EVKHIJFP0tmllAjV1Hz7G33XI0Gp4P68rXElA/A9C7Ll1gi1dQwoq1aADqDlGdJtPqNdlsCVFGCx4maVfRbJ9hl0q2Ms9TtmSEDcQVsiTjzFHNcDq7P9/wN9QUxKm3YOD/MuweITw0Sna0+y5xzFb6mbNR/Ppt6LteoXXf/9E60TDY7/awZZ/Wxgl7JekniuYjpWjk1XjDtbcHC1HFvkeZ8DIJKztppNvvDl71ulKmLbvF2q19bQz4dY3Ua9Fveet319E1HxuY8rCZElwlvKU2OZNnqKipvg2+vTL2KXs3jfMd9UY2tu61rygZJLu5EkGRelc3+MNFGENq2CJTRmkQHgDHVusNsIUNXANNCgCMjhQMe667c5bp+38RB/FV4m1nETiZ182oxTCdg2aQDm62dhgZwl+jbrI2epyeU5otQvkdJ0PTn6WwNBieuDJHmo2OOI+Nrbn/JqnadOpGt1Oq6Z8AFkNPbKDKXO2fg9sG8LngFolMFIdUkwj82UHkHbpAlUfXS8U4T29JrZ1Ksc8di0cz32XFar/YlwVleptgB8DgA16dAnoz9oF5G0LoZDl0DcZzzyGwgKKs4cQVDHYW/wE5kSoJ9nNAa2hfC6/WNwtUN9ZwCqbrRFVVsIHU="}',
        /** A pre start script is used to copy the assets from node modules to public directory */
        assetBaseUrl: 'assets/',
        layout: 'basic',
        responsive: true
    }

    componentDidMount() {
        this.initEditor()

        // Make the value global for the Cypress end-to-end (E2E) test.
        // This is not necessary for the PhotoEditorSDK to work and can be removed safely.
        window.initPesdk = this.initEditor.bind(this);
    }

    async initEditor(config = {}) {
        if (this.editor) {
            this.editor.dispose()
        }
        const editor = await PhotoEditorSDKUI.init(
            deepmergeAll([this.config, config])
        )
        this.editor = editor

        console.log('PhotoEditorSDK for Web is ready!')
        editor.on(UIEvent.EXPORT, (imageSrc) => {
            console.log('Exported ', imageSrc)
        })

        // Make the value global for the Cypress end-to-end (E2E) test.
        // This is not necessary for the PhotoEditorSDK to work and can be removed safely.
        window.pesdkEditor = editor
    }

    render() {
        return (<div id="editor" style={{ width: '100vw', height: '100vh' }} />)
    }
}