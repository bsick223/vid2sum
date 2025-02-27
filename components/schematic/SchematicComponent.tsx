
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
import SchematicEmbed from "./SchematicEmbed"



async function SchematicComponent({ componentId }: { componentId: string }) {

    if (!componentId) {
        return null;
    }

    // get access tokens
    const acessToken = await getTemporaryAccessToken();

    if (!acessToken) {
        throw new Error("No access token found. ");
    }  

  return <SchematicEmbed accessToken={acessToken} componentId={componentId} />;
}

export default SchematicComponent;
