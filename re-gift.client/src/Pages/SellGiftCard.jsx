import React, { useState } from 'react';

export function SellGiftCard() {
    // State för formulärdata
    const [formData, setFormData] = useState({
        company: '',
        expireDate: '',
        balance: '',
        serialNumber: '', 
        salePrice: '', 
    });

    // Hantera ändringar i formulärfälten
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Kontrollera om serienumret innehåller endast bokstäver och siffror
        if (name === 'serialNumber' && !/^[a-zA-Z0-9]*$/.test(value)) {
            return; 
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hantera formulärets inskick
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulärdata:', formData);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Sälj Presentkort</h1>
            <p className="text-center text-muted">Fyll i informationen nedan för att sälja ditt presentkort.</p>

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
                {/* Företag */}
                <div className="mb-3">
                    <label htmlFor="company" className="form-label">Företag:</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                {/* Utgångsdatum */}
                <div className="mb-3">
                    <label htmlFor="expireDate" className="form-label">Utgångsdatum:</label>
                    <input
                        type="date"
                        id="expireDate"
                        name="expireDate"
                        value={formData.expireDate}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                {/* Saldo */}
                <div className="mb-3">
                    <label htmlFor="balance" className="form-label">Saldo (kr):</label>
                    <input
                        type="number"
                        id="balance"
                        name="balance"
                        value={formData.balance}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                {/* Försäljningsbelopp */}
                <div className="mb-3">
                    <label htmlFor="salePrice" className="form-label">Försäljningsbelopp (kr):</label>
                    <input
                        type="number"
                        id="salePrice"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Ange beloppet du vill sälja presentkortet för"
                    />
                </div>

                {/* Serienummer */}
                <div className="mb-3">
                    <label htmlFor="serialNumber" className="form-label">Serienummer:</label>
                    <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        required
                        maxLength="16" 
                        className="form-control"
                        placeholder="Ange presentkortets serienummer"
                    />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100">Skicka</button>
            </form>
        </div>
    );
}
