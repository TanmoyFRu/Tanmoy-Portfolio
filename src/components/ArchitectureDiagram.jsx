import { useMemo } from 'react';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
    Handle,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import {
    FaServer, FaDatabase, FaMemory, FaCogs, FaRobot,
    FaLock, FaChartBar, FaSearch, FaUser, FaFileAlt,
    FaNetworkWired, FaCode
} from 'react-icons/fa';

const iconMap = {
    api: FaServer,
    database: FaDatabase,
    cache: FaMemory,
    worker: FaCogs,
    ai: FaRobot,
    auth: FaLock,
    monitor: FaChartBar,
    search: FaSearch,
    user: FaUser,
    file: FaFileAlt,
    network: FaNetworkWired,
    code: FaCode
};

const CustomNode = ({ data }) => {
    const { theme } = useTheme();
    const isSolar = theme === 'solar';
    const Icon = iconMap[data.icon] || FaServer;

    const colorSchemes = {
        primary: {
            bg: isSolar ? 'bg-blue-50' : 'bg-blue-950/80',
            border: isSolar ? 'border-blue-300' : 'border-blue-500/50',
            icon: isSolar ? 'bg-blue-500' : 'bg-blue-600',
            text: isSolar ? 'text-blue-900' : 'text-blue-100'
        },
        secondary: {
            bg: isSolar ? 'bg-emerald-50' : 'bg-emerald-950/80',
            border: isSolar ? 'border-emerald-300' : 'border-emerald-500/50',
            icon: isSolar ? 'bg-emerald-500' : 'bg-emerald-600',
            text: isSolar ? 'text-emerald-900' : 'text-emerald-100'
        },
        accent: {
            bg: isSolar ? 'bg-purple-50' : 'bg-purple-950/80',
            border: isSolar ? 'border-purple-300' : 'border-purple-500/50',
            icon: isSolar ? 'bg-purple-500' : 'bg-purple-600',
            text: isSolar ? 'text-purple-900' : 'text-purple-100'
        },
        warning: {
            bg: isSolar ? 'bg-amber-50' : 'bg-amber-950/80',
            border: isSolar ? 'border-amber-300' : 'border-amber-500/50',
            icon: isSolar ? 'bg-amber-500' : 'bg-amber-600',
            text: isSolar ? 'text-amber-900' : 'text-amber-100'
        },
        danger: {
            bg: isSolar ? 'bg-red-50' : 'bg-red-950/80',
            border: isSolar ? 'border-red-300' : 'border-red-500/50',
            icon: isSolar ? 'bg-red-500' : 'bg-red-600',
            text: isSolar ? 'text-red-900' : 'text-red-100'
        },
        info: {
            bg: isSolar ? 'bg-cyan-50' : 'bg-cyan-950/80',
            border: isSolar ? 'border-cyan-300' : 'border-cyan-500/50',
            icon: isSolar ? 'bg-cyan-500' : 'bg-cyan-600',
            text: isSolar ? 'text-cyan-900' : 'text-cyan-100'
        }
    };

    const scheme = colorSchemes[data.color] || colorSchemes.primary;
    const handleStyle = {
        background: isSolar ? '#6366f1' : '#a5b4fc',
        width: 6,
        height: 6,
        border: 'none'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            transition={{ duration: 0.5, delay: data.delay || 0 }}
            className={`
                px-4 py-3 rounded-2xl ${isSolar ? 'bg-white/90' : 'bg-gray-950/80'} ${scheme.border}
                border backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.3)]
                relative group transition-all duration-300
                hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]
            `}
        >
            <Handle type="target" position={Position.Top} style={handleStyle} className="!bg-[var(--accent)] !border-none" />
            <Handle type="source" position={Position.Bottom} style={handleStyle} className="!bg-[var(--accent)] !border-none" />

            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl ${scheme.icon} flex items-center justify-center shadow-inner relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                    <div className="absolute inset-0 bg-white/10 blur-sm opacity-50" />
                    <Icon className="text-white text-sm relative z-10" />
                </div>
                <div className="flex flex-col">
                    <h4 className={`font-bold text-xs tracking-tight ${isSolar ? 'text-gray-900' : 'text-gray-100'}`}>{data.label}</h4>
                    {data.sublabel && (
                        <span className={`text-[9px] font-medium opacity-50 ${isSolar ? 'text-gray-600' : 'text-gray-400'}`}>{data.sublabel}</span>
                    )}
                </div>
            </div>

            {/* Subtle glow effect indicator */}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] ${scheme.icon} blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </motion.div>
    );
};

const nodeTypes = { custom: CustomNode };

const architectures = {
    'Link Ingestor API': {
        nodes: [
            {
                id: 'client', type: 'custom', position: { x: 150, y: 0 },
                data: { label: 'HTTP Client', sublabel: 'Request', icon: 'network', color: 'info', delay: 0 }
            },
            {
                id: 'fastapi', type: 'custom', position: { x: 150, y: 90 },
                data: { label: 'FastAPI', sublabel: 'REST Gateway', icon: 'api', color: 'primary', delay: 0.1 }
            },
            {
                id: 'postgres', type: 'custom', position: { x: 350, y: 90 },
                data: { label: 'PostgreSQL', sublabel: 'Storage', icon: 'database', color: 'secondary', delay: 0.15 }
            },
            {
                id: 'redis', type: 'custom', position: { x: 0, y: 180 },
                data: { label: 'Redis', sublabel: 'Cache/Results', icon: 'cache', color: 'danger', delay: 0.2 }
            },
            {
                id: 'rabbitmq', type: 'custom', position: { x: 300, y: 180 },
                data: { label: 'RabbitMQ', sublabel: 'Message Broker', icon: 'network', color: 'warning', delay: 0.2 }
            },
            {
                id: 'celery', type: 'custom', position: { x: 150, y: 270 },
                data: { label: 'Celery', sublabel: '200+ Workers', icon: 'worker', color: 'accent', delay: 0.3 }
            },
            {
                id: 'scraper', type: 'custom', position: { x: 150, y: 360 },
                data: { label: 'Ingestion', sublabel: 'Retry/Backoff', icon: 'search', color: 'info', delay: 0.4 }
            },
        ],
        edges: [
            { id: 'e1', source: 'client', target: 'fastapi' },
            { id: 'e2', source: 'fastapi', target: 'postgres' },
            { id: 'e3', source: 'fastapi', target: 'redis' },
            { id: 'e4', source: 'fastapi', target: 'rabbitmq' },
            { id: 'e5', source: 'rabbitmq', target: 'celery' },
            { id: 'e6', source: 'redis', target: 'celery' },
            { id: 'e7', source: 'celery', target: 'scraper' },
        ]
    },
    'ChatApp Backend': {
        nodes: [
            {
                id: 'user', type: 'custom', position: { x: 150, y: 0 },
                data: { label: 'User', sublabel: 'Client', icon: 'user', color: 'info', delay: 0 }
            },
            {
                id: 'websocket', type: 'custom', position: { x: 150, y: 90 },
                data: { label: 'WebSocket', sublabel: 'Real-time', icon: 'network', color: 'primary', delay: 0.1 }
            },
            {
                id: 'jwt', type: 'custom', position: { x: 350, y: 90 },
                data: { label: 'JWT Auth', sublabel: 'Handshake', icon: 'auth', color: 'danger', delay: 0.15 }
            },
            {
                id: 'fastapi', type: 'custom', position: { x: 150, y: 180 },
                data: { label: 'FastAPI', sublabel: 'Chat API', icon: 'api', color: 'primary', delay: 0.2 }
            },
            {
                id: 'rabbitmq', type: 'custom', position: { x: 350, y: 180 },
                data: { label: 'RabbitMQ', sublabel: 'Message Queue', icon: 'network', color: 'warning', delay: 0.2 }
            },
            {
                id: 'postgres', type: 'custom', position: { x: 0, y: 270 },
                data: { label: 'PostgreSQL', sublabel: 'Messages', icon: 'database', color: 'secondary', delay: 0.3 }
            },
            {
                id: 'celery', type: 'custom', position: { x: 300, y: 270 },
                data: { label: 'Celery', sublabel: '20k+ Requests', icon: 'worker', color: 'accent', delay: 0.3 }
            },
        ],
        edges: [
            { id: 'e1', source: 'user', target: 'websocket' },
            { id: 'e2', source: 'websocket', target: 'jwt' },
            { id: 'e3', source: 'websocket', target: 'fastapi' },
            { id: 'e4', source: 'fastapi', target: 'rabbitmq' },
            { id: 'e5', source: 'fastapi', target: 'postgres' },
            { id: 'e6', source: 'rabbitmq', target: 'celery' },
            { id: 'e7', source: 'celery', target: 'postgres' },
        ]
    },
    'User-Blog Authentication API': {
        nodes: [
            {
                id: 'client', type: 'custom', position: { x: 150, y: 0 },
                data: { label: 'Client', sublabel: 'HTTP', icon: 'network', color: 'info', delay: 0 }
            },
            {
                id: 'fastapi', type: 'custom', position: { x: 150, y: 90 },
                data: { label: 'FastAPI', sublabel: 'REST API', icon: 'api', color: 'primary', delay: 0.1 }
            },
            {
                id: 'jwt', type: 'custom', position: { x: 350, y: 90 },
                data: { label: 'JWT', sublabel: 'OAuth2', icon: 'auth', color: 'danger', delay: 0.15 }
            },
            {
                id: 'hash', type: 'custom', position: { x: 0, y: 180 },
                data: { label: 'Bcrypt', sublabel: 'Password Hash', icon: 'auth', color: 'warning', delay: 0.2 }
            },
            {
                id: 'sqlalchemy', type: 'custom', position: { x: 300, y: 180 },
                data: { label: 'SQLAlchemy', sublabel: 'ORM', icon: 'code', color: 'accent', delay: 0.2 }
            },
            {
                id: 'sqlite', type: 'custom', position: { x: 150, y: 270 },
                data: { label: 'SQLite', sublabel: 'Database', icon: 'database', color: 'secondary', delay: 0.3 }
            },
            {
                id: 'crud', type: 'custom', position: { x: 150, y: 360 },
                data: { label: 'CRUD', sublabel: 'Users + Blogs', icon: 'file', color: 'info', delay: 0.4 }
            },
        ],
        edges: [
            { id: 'e1', source: 'client', target: 'fastapi' },
            { id: 'e2', source: 'fastapi', target: 'jwt' },
            { id: 'e3', source: 'fastapi', target: 'hash' },
            { id: 'e4', source: 'fastapi', target: 'sqlalchemy' },
            { id: 'e5', source: 'sqlalchemy', target: 'sqlite' },
            { id: 'e6', source: 'sqlite', target: 'crud' },
        ]
    },
    'Cyphire': {
        nodes: [
            {
                id: 'client', type: 'custom', position: { x: 150, y: 0 },
                data: { label: 'Credential', sublabel: 'Submit/Verify', icon: 'file', color: 'info', delay: 0 }
            },
            {
                id: 'fastapi', type: 'custom', position: { x: 150, y: 90 },
                data: { label: 'FastAPI', sublabel: 'REST Gateway', icon: 'api', color: 'primary', delay: 0.1 }
            },
            {
                id: 'swagger', type: 'custom', position: { x: 350, y: 90 },
                data: { label: 'Swagger', sublabel: 'OpenAPI Docs', icon: 'code', color: 'secondary', delay: 0.15 }
            },
            {
                id: 'async', type: 'custom', position: { x: 0, y: 180 },
                data: { label: 'Async Worker', sublabel: 'Tx Processing', icon: 'worker', color: 'accent', delay: 0.2 }
            },
            {
                id: 'postgres', type: 'custom', position: { x: 300, y: 180 },
                data: { label: 'PostgreSQL', sublabel: 'State Sync', icon: 'database', color: 'secondary', delay: 0.25 }
            },
            {
                id: 'web3', type: 'custom', position: { x: 0, y: 270 },
                data: { label: 'Web3.py', sublabel: 'Tx Validation', icon: 'code', color: 'accent', delay: 0.3 }
            },
            {
                id: 'polygon', type: 'custom', position: { x: 300, y: 270 },
                data: { label: 'Polygon', sublabel: 'Credential Anchor', icon: 'network', color: 'warning', delay: 0.35 }
            },
        ],
        edges: [
            { id: 'e1', source: 'client', target: 'fastapi' },
            { id: 'e2', source: 'fastapi', target: 'swagger' },
            { id: 'e3', source: 'fastapi', target: 'async' },
            { id: 'e4', source: 'fastapi', target: 'postgres' },
            { id: 'e5', source: 'async', target: 'web3' },
            { id: 'e6', source: 'web3', target: 'polygon' },
            { id: 'e7', source: 'postgres', target: 'polygon' },
        ]
    }
};

const ArchitectureDiagram = ({ projectTitle }) => {
    const { theme } = useTheme();
    const isSolar = theme === 'solar';

    const architecture = architectures[projectTitle];

    const initialNodes = useMemo(() => architecture?.nodes || [], [projectTitle]);

    const initialEdges = useMemo(() =>
        (architecture?.edges || []).map(edge => ({
            ...edge,
            type: 'smoothstep',
            animated: true,
            style: {
                stroke: isSolar ? '#6366f1' : '#818cf8',
                strokeWidth: 2
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: isSolar ? '#6366f1' : '#818cf8',
                width: 12,
                height: 12
            }
        })), [projectTitle, isSolar]
    );

    const [nodes] = useNodesState(initialNodes);
    const [edges] = useEdgesState(initialEdges);

    if (!architecture) return null;

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                    minZoom: 0.2,
                    maxZoom: 1,
                    includeHiddenNodes: false
                }}
                panOnDrag={true}
                zoomOnScroll={false}
                zoomOnPinch={true}
                zoomOnDoubleClick={false}
                preventScrolling={false}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                proOptions={{ hideAttribution: true }}
            />
        </div>
    );
};

export default ArchitectureDiagram;
