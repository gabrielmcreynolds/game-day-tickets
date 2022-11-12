import {Client, Databases, Models} from "appwrite";
import {GetServerSideProps} from "next";


export default function Home({documents}: { documents: Models.DocumentList<Models.Document> }) {
    return (
        <>
            <ul>
                {documents.documents.map((doc) =>
                    <li key={doc.$id}>
                        {doc.name} -- {doc.$id}
                    </li>)}
            </ul>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = new Client()
        .setEndpoint('http://localhost/v1')
        .setProject('636f1031153aa3b07928');

    const databases = new Databases(client);

    const documents = await databases.listDocuments('636f12040b4dcf85b62c', '636f120814bc273d82db');
    return {
        props: {documents},
    }
}
