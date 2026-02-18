// import node module libraries
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import {
    Row,
    Col,
    Image,
    Dropdown,
    ListGroup,
} from 'react-bootstrap';

// simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import data files
import NotificationList from 'data/Notification';

// import hooks
import useMounted from 'hooks/useMounted';

const QuickMenu = () => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const hasMounted = useMounted();
    
    const handleDropdownToggle = (isOpen, event, { source }) => {
        if (source === 'select') {
            setShowDropdown(true);
            return;
        }
        setShowDropdown(isOpen);
    };
    
    const handleMenuItemClick = (e, path) => {
        e.preventDefault();
        setShowDropdown(false);
        router.push(path);
    };
    
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const Notifications = () => {
        return (
            <SimpleBar style={{ maxHeight: '300px' }}>
                <ListGroup variant="flush">
                    {NotificationList.map(function (item, index) {
                        return (
                            <ListGroup.Item className={index === 0 ? 'bg-light' : ''} key={index}>
                                <Row>
                                    <Col>
                                        <Link href="#" className="text-muted">
                                            <h5 className=" mb-1">{item.sender}</h5>
                                            <p className="mb-0"> {item.message}</p>
                                        </Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </SimpleBar>
        );
    }

    const QuickMenuDesktop = () => {
        return (
        <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
            <Dropdown as="li" className="stopevent">
                <Dropdown.Toggle as="a"
                    bsPrefix=' '
                    id="dropdownNotification"
                    className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                    <i className="fe fe-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                    aria-labelledby="dropdownNotification"
                    align="end"
                    show
                    >
                    <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                        <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                            <span className="h4 mb-0">Notifications</span>
                            <Link href="/" className="text-muted">
                                <span className="align-middle">
                                    <i className="fe fe-settings me-1"></i>
                                </span>
                            </Link>
                        </div>
                        <Notifications />
                        <div className="border-top px-3 pt-3 pb-3">
                            <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                See all Notifications
                            </Link>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as="li" className="ms-2">
                <Dropdown.Toggle
                    as="a"
                    bsPrefix=' '
                    className="rounded-circle"
                    id="dropdownUser">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                        <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dropdown-menu dropdown-menu-end "
                    align="end"
                    aria-labelledby="dropdownUser"
                    show
                    >
                    <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                            <div className="lh-1 ">
                                <h5 className="mb-1"> John E. Grainger</h5>
                                <Link href="/profile" className="text-inherit fs-6">View my profile</Link>
                            </div>
                            <div className=" dropdown-divider mt-3 mb-2"></div>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        <Link href="/pages/account" className="dropdown-item-link"><i className="fe fe-user me-2"></i> My Account</Link>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        <Link href="/pages/my-payment" className="dropdown-item-link"><i className="fe fe-activity me-2"></i> My purchases</Link>
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <Link href="/statistics" className="dropdown-item-link"><i className="fe fe-settings me-2"></i> Statistics</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a href="#" className="dropdown-item-link text-danger" onClick={(e) => { e.preventDefault(); /* Add sign out logic here */ }}><i className="fe fe-power me-2"></i> Sign Out</a>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </ListGroup>
    )}

    const QuickMenuMobile = () => {
        return (
        <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
            <Dropdown as="li" className="stopevent">
                <Dropdown.Toggle as="a"
                    bsPrefix=' '
                    id="dropdownNotification"
                    className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                    <i className="fe fe-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                    aria-labelledby="dropdownNotification"
                    align="end"
                    >
                    <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                        <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                            <span className="h4 mb-0">Notifications</span>
                            <Link href="/" className="text-muted">
                                <span className="align-middle">
                                    <i className="fe fe-settings me-1"></i>
                                </span>
                            </Link>
                        </div>
                        <Notifications />
                        <div className="border-top px-3 pt-3 pb-3">
                            <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                See all Notifications
                            </Link>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as="li" className="ms-2">
                <Dropdown.Toggle
                    as="a"
                    bsPrefix=' '
                    className="rounded-circle"
                    id="dropdownUser">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                        <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dropdown-menu dropdown-menu-end "
                    align="end"
                    aria-labelledby="dropdownUser"
                    >
                    <Dropdown.Header className="px-3 pt-3">
                        <div className="d-flex align-items-center">
                            <div className="avatar avatar-md avatar-indicators avatar-online me-3">
                                <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                            </div>
                            <div>
                                <h5 className="mb-1">Admin User</h5>
                                <p className="mb-0 text-muted">admin@example.com</p>
                            </div>
                        </div>
                    </Dropdown.Header>
                    <Dropdown.Divider className="mx-3 my-0" />
                    
                    <Dropdown.Header className="px-3 pt-2 pb-1">
                        <h6 className="text-uppercase text-muted mb-0">Account</h6>
                    </Dropdown.Header>
                    <Dropdown.Item 
                        as="a" 
                        href="/profile" 
                        className="d-flex justify-content-between align-items-center"
                        onClick={(e) => handleMenuItemClick(e, '/profile')}>
                        <span><i className="fe fe-user me-2"></i> My Profile</span>
                        <span className="badge bg-primary rounded-pill">3</span>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="a" 
                        href="/settings" 
                        className="d-flex justify-content-between align-items-center"
                        onClick={(e) => handleMenuItemClick(e, '/settings')}>
                        <span><i className="fe fe-settings me-2"></i> Settings</span>
                        <span className="badge bg-success rounded-pill">1</span>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="a" 
                        href="/billing" 
                        className="d-flex justify-content-between align-items-center"
                        onClick={(e) => handleMenuItemClick(e, '/billing')}>
                        <span><i className="fe fe-credit-card me-2"></i> Billing</span>
                        <span className="badge bg-warning rounded-pill">2</span>
                    </Dropdown.Item>
                    
                    <Dropdown.Divider className="mx-3 my-0" />
                    
                    <Dropdown.Header className="px-3 pt-2 pb-1">
                        <h6 className="text-uppercase text-muted mb-0">Notifications</h6>
                    </Dropdown.Header>
                    <Dropdown.Item 
                        as="a" 
                        href="/notifications" 
                        className="d-flex justify-content-between align-items-center"
                        onClick={(e) => handleMenuItemClick(e, '/notifications')}>
                        <span><i className="fe fe-bell me-2"></i> Notifications</span>
                        <span className="badge bg-danger rounded-pill">5</span>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="a" 
                        href="/messages" 
                        className="d-flex justify-content-between align-items-center"
                        onClick={(e) => handleMenuItemClick(e, '/messages')}>
                        <span><i className="fe fe-message-square me-2"></i> Messages</span>
                        <span className="badge bg-info rounded-pill">12</span>
                    </Dropdown.Item>
                    
                    <Dropdown.Divider className="mx-3 my-0" />
                    
                    <Dropdown.Header className="px-3 pt-2 pb-1">
                        <h6 className="text-uppercase text-muted mb-0">Support</h6>
                    </Dropdown.Header>
                    <Dropdown.Item 
                        as="a" 
                        href="/help"
                        onClick={(e) => handleMenuItemClick(e, '/help')}>
                        <i className="fe fe-help-circle me-2"></i> Help Center
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="a" 
                        href="/contact"
                        onClick={(e) => handleMenuItemClick(e, '/contact')}>
                        <i className="fe fe-mail me-2"></i> Contact Support
                    </Dropdown.Item>
                    
                    <Dropdown.Divider className="mx-3 my-0" />
                    
                    <div className="px-3 py-2">
                        <button 
                            onClick={(e) => handleMenuItemClick(e, '/authentication/sign-in')} 
                            className="btn btn-outline-primary w-100">
                            <i className="fe fe-log-out me-2"></i> Sign Out
                        </button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </ListGroup>
    )}

    return (
        <Fragment>
            { hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
        </Fragment>
    )
}

export default QuickMenu;