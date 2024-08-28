import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import the react plugin correctly
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';
import { fileURLToPath, URL } from 'node:url'; // tillagd: Import for URL handling

// Define base folder for certificates
const baseFolder = env.APPDATA !== undefined && env.APPDATA !== ''
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`; // tillagd: Determine base folder for certificates

const certificateName = "re-gift.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`); // tillagd: Path to the cert file
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);  // tillagd: Path to the key file

// Check if certificate files exist, otherwise create them
if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) { // tillagd: Check for existing certificate files
    // Generate the certificate if it does not exist
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit' }).status) { // tillagd: Command to create the certificate
        throw new Error("Could not create certificate."); // tillagd: Throw error if certificate creation fails
    }
}

// Determine the target URL based on environment variables
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7049'; // tillagd: Determine target URL

// Export Vite configuration
export default defineConfig({
    plugins: [react()], // Use the React plugin
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)) // Set up alias for @
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target: target, // tillagd: Use dynamically determined target URL for proxy
                secure: false
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath), // tillagd: Read key file from dynamically determined path
            cert: fs.readFileSync(certFilePath) // tillagd: Read cert file from dynamically determined path
        },
        open: true // Automatically open the browser when the server starts
    }
});
