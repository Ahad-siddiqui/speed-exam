import React, { useState, useRef, useEffect } from 'react';
import { Form, InputGroup, Card, ListGroup } from 'react-bootstrap';
import { FiSearch, FiCornerDownLeft } from 'react-icons/fi';
import Link from 'next/link';
import { searchGlobalData } from 'data/globalSearchData';

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchGlobalData(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      setSearchQuery('');
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      // Navigate to first result on Enter
      window.location.href = searchResults[0].path;
    }
  };

  return (
    <div className="position-relative" ref={searchRef} style={{ minWidth: '300px' }}>
      <InputGroup>
        <InputGroup.Text>
          <FiSearch size={16} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.length > 0 && setShowResults(true)}
          className="pe-5"
        />
        {searchQuery && (
          <span className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted small">
            <FiCornerDownLeft size={14} />
          </span>
        )}
      </InputGroup>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Card 
          className="position-absolute w-100 mt-1 shadow-lg" 
          style={{ 
            zIndex: 1050, 
            maxHeight: '400px', 
            overflowY: 'auto',
            top: '100%'
          }}
        >
          <ListGroup variant="flush">
            {searchResults.map((result, index) => (
              <ListGroup.Item 
                key={result.id}
                action
                className="border-0 py-2 px-3"
                onClick={() => setShowResults(false)}
                as={Link}
                href={result.path}
              >
                <div>
                  <div className="fw-medium text-dark">{result.title}</div>
                  <div className="small text-muted">{result.category}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          {searchResults.length >= 8 && (
            <Card.Footer className="text-center py-2 small text-muted">
              Showing top 8 results. Type more to refine search.
            </Card.Footer>
          )}
        </Card>
      )}

      {/* No Results State */}
      {showResults && searchQuery && searchResults.length === 0 && (
        <Card 
          className="position-absolute w-100 mt-1 shadow-lg" 
          style={{ zIndex: 1050, top: '100%' }}
        >
          <Card.Body className="text-center py-4">
            <FiSearch size={24} className="text-muted mb-2" />
            <p className="text-muted mb-0">No results found for "{searchQuery}"</p>
            <p className="text-muted small mb-0">Try different keywords or browse our help section</p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default GlobalSearch;