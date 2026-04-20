import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importa le icone

function HomePage() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [nome, setNome] = useState('');
    const [lavoro, setLavoro] = useState('');
    const [error, setError] = useState('');

    //funzione save
    const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
      if (!nome || !lavoro) {
        setError('inserire sia nome e lavoro perfavore');
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
        setError('utente aggiunto con successo');
      setLoading(false);
    });
  };

  //funzione update
  const handleUpdate = (id) => {
    setError('');
      if (!nome || !lavoro) {
        setError('inserire sia nome e lavoro perfavore');
        return;
    }
    fetch(`http://localhost:7070/api/v1/users/updateById/${id}`, {
    method: "PUT", 
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
      throw new Error("Errore nell'aggiornamento (Status: " + response.status + ")");
    }
    return response.json();
  })
  .then((updatedUser) => {
    setUsers(users.map(user => user.id === id ? updatedUser : user));
    
    setNome('');
    setLavoro('');
    setError('utente aggiornato con successo');
  })
  .catch((err) => {
    setError("Si è verificato un errore: " + err.message);
  })
  .finally(() => {
    setLoading(false);
  });

};

//funzione delete
const handleDelete = async (id) => {
  if (window.confirm("Sei sicuro di voler eliminare questo utente?")) {
    fetch(`http://localhost:7070/api/v1/users/${id}`, {
          
    method: 'DELETE', 
    headers: {
      "Content-Type": "application/json", 
    }
  })
     .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella cancellazione (Status: " + response.status + ")");
      }
      return "";
      })
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
         setError('utente rimosso con successo');
      })
      .catch((err) => {
        setError("Si è verificato un errore: " + err.message);
      })
    }
  };

  //funzione getall
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
                    <h1>PAGINA UTENTI</h1>
                    <Container className="mt-5">
      <Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {/* COLONNA SINISTRA: La Tabella (prende 8 spazi su 12) */}
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Elenco Utenti</Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Nome</th>
                    <th>Lavoro</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.job}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-primary btn-sm me-2" 
                          onClick={() => handleUpdate(user.id)}
                          title="Edit">
                          <FaEdit />
                      </button>
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => handleDelete(user.id)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
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
              <Card.Title className="mb-4">Aggiungi nuovo utente</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>nome</Form.Label>
                  <Form.Control type="text" 
                  placeholder="Inserisci nome" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>lavoro</Form.Label>
                  <Form.Control type="text" 
                  placeholder="Inserisci lavoro" 
                  value={lavoro}
                  onChange={(e) => setLavoro(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Aggiungi utente
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
