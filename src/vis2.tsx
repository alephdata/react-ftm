import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from './Layout'
import { defaultModel, Model } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Graph } from './Graph'
import { data } from '../resources/az_alievs.js'

const model = new Model(defaultModel)
const ggraph = new Graph()

function useGraph() {
  const [graph, setGraph] = React.useState(ggraph)
  return [graph, setGraph, function() {
    graph.addVertex(new Vertex('12', '12', '12' + Math.random()))
  }]
}

function Vis2() {
  const [graph, , addVertex] = useGraph()
  const [count, setCount] = React.useState(1)
  return <div>
    <div>
      <button onClick={() => Array.from({ length: count })
      // @ts-ignore
        .forEach(addVertex)}>
        add vertex
      </button>
      <input type="text" value={count} onChange={({ target }) => {
        setCount(Number(target.value))
      }}
      />
      <button onClick={() => {
        data
        // @ts-ignore
          .map(rawEntity => model.getEntity(rawEntity))
          // @ts-ignore
          .forEach(graph.addEntity, graph)
      }}>add our friends
      </button>
    </div>
    <div>
      <Layout graph={graph as Graph}/>
    </div>
  </div>
}

ReactDOM.render(
  <Vis2/>,
  document.querySelector('#app')
)

