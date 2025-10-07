import React, { useState } from 'react';
import pinataSDK from '@pinata/sdk';
import { ethers } from 'ethers';

// Add your Pinata credentials here
const pinataApiKey = "53995cf86d7972adb098";
const pinataApiSecret = "e13016f04cb788f1641b98181b5f1f57266fd4b44df984a382b3a2e0a7bf7cd6";

// Initialize the Pinata SDK
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

// Example function to mint an NFT and upload metadata to Pinata
async function mintNFT(metadata) {
    try {
        const result = await pinata.pinJSONToIPFS(metadata);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        throw error;
    }
}

const Mint = ({ contract, account }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const metadata = {
            name,
            description
        };
        try {
            const result = await mintNFT(metadata);
            alert(`Metadata uploaded to Pinata: ${result.IpfsHash}`);
            const tx = await contract.mintNFT(account, result.IpfsHash); // Assuming mintNFT is a function in your contract
            await tx.wait();
            alert('Minting successful');
        } catch (error) {
            alert('Error minting NFT');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Mint NFT</button>
        </form>
    );
};

export default Mint;
