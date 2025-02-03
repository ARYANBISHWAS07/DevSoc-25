import { Container } from "./mainLandingPage";
export function Page5() {
    return (
        <Container id={5}>
            <div className="flex flex-col items-center justify-center h-screen w-full bg-purple-100 p-10 mb-4">
                <h1 className="text-4xl font-bold">Page 5</h1>
                <p className="mt-4 text-lg">This is the fifth page content.</p>
            </div>
        </Container>
    );
}