// import node module libraries
import { useState } from 'react';

// import sub components
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { Row, Col } from 'react-bootstrap';

const DefaultDashboardLayout = (props) => {
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};	
	return (		
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
			<div className="navbar-vertical navbar">
				<NavbarVertical
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
				/>
			</div>
			<div id="page-content" className="pb-6">
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				<div className="px-6 pt-4">
					{props.children}
				</div>
			</div>
			<div
				className="fixed-bottom border-top bg-white px-6 py-3"
				style={{ 
					left: showMenu ? '250px' : '0', 
					right: '0', 
					zIndex: 1050,
					transition: 'left 0.3s ease'
				}}
				>
				<Row>
					<Col sm={6} className="text-center text-sm-start mb-2 mb-sm-0">
					<p className="m-0">Made by <a href="https://i9experts.com">Abdul Ahad</a></p>
					</Col>
					<Col sm={6} className="text-center text-sm-end">
					<p className="m-0">Owned by <a href="https://i9experts.com">I9 Experts Pvt Ltd</a></p>
					</Col>
				</Row>
			</div>
		</div>
	);
};
export default DefaultDashboardLayout;
