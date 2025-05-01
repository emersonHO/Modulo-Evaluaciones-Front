import React from "react";
import { Card, Table, Button } from "react-bootstrap";
const formulas=[
    {
        name: "Grupo de formulas 1",
        formula:[
            {
                id: "asd",
                namecomponent: "asd",
                weight: 0.2
            },
            {
                id: "qwe",
                namecomponent: "qwe",
                weight: 0.3
            },
            {
                id: "zxc",
                namecomponent: "zxc",
                weight: 0.4
            },
        ]
    },
    {
        name: "Grupo de formulas 2",
        formula:[
            {
                id: "asd",
                namecomponent: "asd",
                weight: 0.2
            },
            {
                id: "qwe",
                namecomponent: "qwe",
                weight: 0.3
            },
            {
                id: "zxc",
                namecomponent: "zxc",
                weight: 0.4
            },
        ]
    },
    {
        name: "Grupo de formulas 3",
        formula:[
            {
                id: "asd",
                namecomponent: "asd",
                weight: 0.2
            },
            {
                id: "qwe",
                namecomponent: "qwe",
                weight: 0.3
            },
            {
                id: "zxc",
                namecomponent: "zxc",
                weight: 0.4
            },
        ]
    }
]

export default function GrupoFormulas(){
    return(
        <section>
            <div>
                {formulas.map((item)=>(
                    <Card className="m-4">
                        <Card.Title>
                            {item.name}
                        </Card.Title>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre del componente</th>
                                        <th>Peso del componente</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.formula.map((f) => (
                                    <tr key={f.id}>
                                        <td>{f.id}</td>
                                        <td>{f.namecomponent}</td>
                                        <td>{f.weight}</td>
                                        <td>
                                            <Button>...</Button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button>Añadir componente</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </section>
    )
}