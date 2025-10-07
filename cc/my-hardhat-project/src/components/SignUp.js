import React, { useState } from 'react';
import pinataSDK from '@pinata/sdk';
import { ethers } from 'ethers';

// Add your Pinata credentials here
const pinataApiKey = "53995cf86d7972adb098";
const pinataApiSecret = "e13016f04cb788f1641b98181b5f1f57266fd4b44df984a382b3a2e0a7bf7cd6";

// Initialize the Pinata SDK
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

// Example function to upload a file to Pinata
async function uploadToPinata(file) {
    try {
        const result = await pinata.pinFileToIPFS(file);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        throw error;
    }
}

const SignUp = ({ contract, account }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            try {
                const result = await uploadToPinata(file);
                alert(`File uploaded to Pinata: ${result.IpfsHash}`);
                const tx = await contract.signUp(username, email, result.IpfsHash); // Assuming signUp is a function in your contract
                await tx.wait();
                alert('Sign Up successful');
            } catch (error) {
                alert('Error signing up');
                console.error(error);
            }
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Upload File:</label>
                <input type="file" onChange={handleFileChange} required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
