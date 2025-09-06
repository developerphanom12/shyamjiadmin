import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './newsletter.css';

const Newsletter = () => {
    const [subscribers, setSubscribers] = useState([
        { id: 1, email: 'Sahil@gmail.com', active: true },
        { id: 2, email: 'this@gsmil.com', active: true },
        { id: 3, email: 'that@gamil.com', active: true },
        { id: 4, email: 'why@gmail.com', active: true },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const totalPages = itemsPerPage ? Math.ceil(subscribers.length / itemsPerPage) : 0;

    const toggleSubscriberStatus = (subscriberId) => {
        setSubscribers(prevSubscribers =>
            prevSubscribers.map(subscriber =>
                subscriber.id === subscriberId
                    ? { ...subscriber, active: !subscriber.active }
                    : subscriber
            )
        );
    };

    const handleItemsPerPageChange = (e) => {
        const value = Number(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const currentSubscribers = itemsPerPage
        ? subscribers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    return (
        <div className="Newsletter-page">
            <h2 className="news-title">Welcome Back, Admin!</h2>

            <div className='news-card'>
                <h2 className="news-card-title">Newsletter</h2>
                <p className="news-card-subtitle">
                    Detailed product records for quick updates and monitoring.
                </p>

                <table className="newsletter-table">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Email Id</th>
                            <th style={{ textAlign: "right" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSubscribers.map((subscriber, index) => (
                            <tr key={subscriber.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{subscriber.email}</td>
                                <td className="action-cell">
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={subscriber.active}
                                            onChange={() => toggleSubscriberStatus(subscriber.id)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Bottom Controls for Newsletter */}
                <div className="news-bottom-controls">
                    <div>
                        Showing
                        <select value={itemsPerPage || ''} onChange={handleItemsPerPageChange}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                                <option key={count} value={count}>{count}</option>
                            ))}
                        </select>
                    </div>

                    <div className="news-record-info">
                        Showing {currentSubscribers.length > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0} to {((currentPage - 1) * itemsPerPage + currentSubscribers.length)} out of {subscribers.length} records
                    </div>

                    <div className="news-pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="news-arrow-button"
                        >
                            <FiChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={currentPage === page ? 'active' : ''}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="news-arrow-button"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter;
