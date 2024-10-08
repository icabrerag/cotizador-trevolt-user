import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Página Principal</h1>
            <Link href="/cotizador">Ir al Cotizador</Link>
        </div>
    );
}
