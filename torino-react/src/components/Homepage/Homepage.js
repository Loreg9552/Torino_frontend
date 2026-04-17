import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Form, Button, Card, Alert } from 'react-bootstrap';

function HomePage() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [nome, setNome] = useState('');
    const [lavoro, setLavoro] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
	setError('');
    if (!nome || !lavoro) {
      setError('Please enter both name and job.');
      return;
    }

    fetch("http://localhost:7070/api/v1/users/save", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({
      name: nome,  
      job: lavoro 
    }),
  })
     .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel salvataggio (Status: " + response.status + ")");
      }
      return response.json();
    })
    .then((newUser) => {
      // Aggiorniamo la lista utenti aggiungendo quello appena tornato dal database
      setUsers([...users, newUser]);
      // Svuotiamo i campi
      setNome('');
      setLavoro('');
    })
    .catch((err) => {
      setError("Si è verificato un errore: " + err.message);
    })
    .finally(() => {
        setError('user added');
      setLoading(false);
    });
};

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:7070/api/v1/users/all")
            .then(response => response.json())
            .then(json => setUsers(json))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div className="App">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1>Users</h1>
                    <Container className="mt-5">
      <Row>
        {/* COLONNA SINISTRA: La Tabella (prende 8 spazi su 12) */}
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Elenco Utenti</Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Job</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.job}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* COLONNA DESTRA: Il Form (prende 4 spazi su 12) */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Add user</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>name</Form.Label>
                  <Form.Control type="text" 
                  placeholder="Insert name" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Job</Form.Label>
                  <Form.Control type="text" 
                  placeholder="Insert job" 
                  value={lavoro}
                  onChange={(e) => setLavoro(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
                </>
            )}
        </div>
    );
}

export default HomePage;
