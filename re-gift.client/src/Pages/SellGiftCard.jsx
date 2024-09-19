import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function SellGiftCard() {
    const companies = [
        "Nike", "Adidas", "Elgiganten", "BattleNet", "PSN",
        "Steam", "Ikea", "Ica", "Logitech", "Webhallen", "AkademiBok", "BurgerKing"
    ];

    const percentages = [
        { value: 0, label: "25%" },
        { value: 1, label: "50%" },
        { value: 2, label: "75%" }
    ];

    const [formData, setFormData] = useState({
        company: '',
        expireDate: '',
        balance: '',
        serialNumber: '',
        percentage: '',
    });

    const { user, fetchGiftCards } = useContext(AppContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(null);

    const today = new Date();
    today.setDate(today.getDate() + 7);
    const minDate = today.toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'serialNumber' && !/^[a-zA-Z0-9]*$/.test(value)) {
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
            company: '',
            expireDate: '',
            balance: '',
            serialNumber: '',
            percentage: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const today = new Date();
        const expireDate = new Date(formData.expireDate);
        const diffInTime = expireDate.getTime() - today.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        if (diffInDays < 6) {
            setError('Utgångsdatum måste vara minst 7 dagar framåt.');
            return;
        }

        const giftCardData = {
            id: 0,
            company: companies[formData.company],
            expireDate: formData.expireDate,
            balance: formData.balance,
            discountPercentage: formData.percentage,
            serialNumber: formData.serialNumber,
        };

        try {
            const response = await fetch(`https://re-gift-aeesgygqhsbaf8eh.eastus-01.azurewebsites.net/api/GiftCard/${user.id}/${formData.company}/${formData.percentage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(giftCardData),
            });

            if (response.ok) {
                setSuccess('Presentkortet har lagts till framgångsrikt!');
                setError('');
                resetForm(); // Reset the form
                fetchGiftCards(); // Refresh the gift cards list
            } else {
                const errorText = await response.text();
                setError(`Fel vid tillägg av presentkort: ${errorText}`);
            }
        } catch (err) {
            setError('Ett oväntat fel inträffade. Försök igen senare.');
        }
    };

    const toggleTooltip = (tooltipId) => {
        setTooltipVisible(tooltipVisible === tooltipId ? null : tooltipId);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Sälj Presentkort</h1>
            <p className="text-center text-muted">Fyll i informationen nedan för att sälja ditt presentkort.</p>

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label htmlFor="company" className="form-label">Företag:</label>
                    <select
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Välj ett företag</option>
                        {companies.map((company, index) => (
                            <option key={index} value={index}>
                                {company}
                            </option>
                        ))}
                    </select>
                </div>

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

                <div className="mb-3 position-relative">
                    <label htmlFor="percentage" className="form-label">
                        Rabattprocent: &nbsp;
                        <i
                            className="bi bi-question-circle"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleTooltip('percentage-tooltip')}
                        ></i>
                        {tooltipVisible === 'percentage-tooltip' && (
                            <span
                                style={{
                                    backgroundColor: '#333',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    transform: 'translateY(5px)',
                                    zIndex: 10,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Välj med hur många procent presentkortet skall vara rabatterat
                            </span>
                        )}
                    </label>
                    <select
                        id="percentage"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Välj rabattprocent</option>
                        {percentages.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="expireDate" className="form-label">
                        Utgångsdatum: &nbsp;
                        <i
                            className="bi bi-question-circle"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleTooltip('expireDate-tooltip')}
                        ></i>
                        {tooltipVisible === 'expireDate-tooltip' && (
                            <span
                                style={{
                                    backgroundColor: '#333',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    transform: 'translateY(5px)',
                                    zIndex: 10,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Vi registrerar ej presentkort som utgår inom en veckas tid
                            </span>
                        )}
                    </label>
                    <input
                        type="date"
                        id="expireDate"
                        name="expireDate"
                        value={formData.expireDate}
                        onChange={handleChange}
                        min={minDate}
                        required
                        className="form-control"
                    />
                </div>

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

                <button type="submit" className="btn btn-primary w-100">Skicka</button>

                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
}

