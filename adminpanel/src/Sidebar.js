import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = Cookies.get('user');
    const username = Cookies.get('username');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as per your requirement
        };

        handleResize(); // Call initially to set the initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!user) {
        navigate('/');
    }

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
                <div className="flex-row d-flex">
                {isMobile && (
                        
                        <button
                            type="button"
                            className="navbar-toggler"
                            onClick={toggleSidebar}
                            title="Toggle responsive left sidebar"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    
                    )}
                    <Link className="navbar-brand" to="/" title="Free Bootstrap 4 Admin Template">
                        Gericht Record Book
                    </Link>
                    
                </div>
            </nav>
            {(!isMobile || isSidebarOpen) && (
                <div
                    className={`col-md-3 col-lg-2 sidebar-offcanvas pl-0 ${
                        isSidebarOpen ? 'show' : ''
                    }`}
                    id="sidebar"
                    role="navigation"
                    style={{ backgroundColor: '#e9ecef', position: 'sticky', top: 0, maxHeight: '100vh', overflowY: 'auto', zIndex: 11 }}
                >
                    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3">
                        {user === 'superadmin' ? (
                            <>
                            <li className="nav-item mb-2 mt-3">
                                <span className="nav-link text-secondary">
                                    <h5>{username}</h5>
                                </span>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/dashboard">
                                    <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/TodayRooms">
                                    <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">TodayRooms</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Allinfo">
                                    <i className="far fa-book font-weight-bold"></i> <span className="ml-3">All table Info</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Allroominfo">
                                    <i className="far fa-book font-weight-bold"></i> <span className="ml-3">All Room Info</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Request">
                                    <i className="fas fa-bell font-weight-bold"></i><span className="ml-3">Request</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/NewsLatter">
                                    <i className="fas fa-envelope font-weight-bold"></i><span className="ml-3">Newslatter</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/paneluser">
                                    <i className="fas fa-address-book font-weight-bold"></i> <span className="ml-3">Panel user</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Adduser">
                                    <i className="far fa-plus font-weight-bold"></i> <span className="ml-3">Add user</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/">
                                    <i className="far fa-backward font-weight-bold"></i> <span className="ml-3">Log Out</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item mb-2 mt-3">
                                <span className="nav-link text-secondary">
                                    <h5>Jacob Nejam</h5>
                                </span>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/dashboard">
                                    <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/TodayRooms">
                                    <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">TodayRooms</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Allinfo">
                                    <i className="far fa-book font-weight-bold"></i> <span className="ml-3">All Info</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Allroominfo">
                                    <i className="far fa-book font-weight-bold"></i> <span className="ml-3">All Room Info</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/Request">
                                    <i className="fas fa-bell font-weight-bold"></i><span className="ml-3">Request</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link text-secondary" to="/">
                                    <i className="fas fa-sign-out-alt font-weight-bold"></i> <span className="ml-3">Log Out</span>
                                </Link>
                            </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Sidebar;
