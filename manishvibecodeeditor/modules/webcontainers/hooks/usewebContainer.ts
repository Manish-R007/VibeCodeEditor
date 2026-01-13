import { useState,useEffect, useCallback } from "react";
import {WebContainer} from "@webcontainer/api";
import { TemplateFolder } from "@/modules/playground/lib/path-to-json";

interface UseWebConatinerProps {
    template:TemplateFolder
}

interface UseWebContainerReturn {
    serverUrl:string | null
    isLoading: boolean
    error: string | null
    instance:WebContainer | null
    writeFileSync:(path:string, content:string)=> Promise<void>
    destroy:()=>void
}

export const useWebContainer = ({template} : UseWebConatinerProps):UseWebContainerReturn => {
    const [serverUrl, setServerUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [instance, setInstance] = useState<WebContainer | null>(null);

    useEffect(() => {
        let mounted = true
        async function initializeWebContainer () {
            try {
                const webContainer = await WebContainer.boot();
                if(!mounted) return
                setInstance(webContainer)
                setIsLoading(false)
            } catch (error:any) {
                setError(error.message)
            }
        }

        initializeWebContainer()

        return () => {
            mounted = false
            if(instance){
                instance.teardown()
            }
        }
    },[])

    const writeFileSync = useCallback(async (path:string,content:string):Promise<void> => {
        if(!instance){
            throw new Error('WebContainer not initialized')
        }

        try {
            const pathParts = path.split("/")
            const folderpath = pathParts.slice(0,-1).join("/")

            if(folderpath){
                await instance.fs.mkdir(folderpath,{recursive:true})
            }

            await instance.fs.writeFile(path,content)
        } catch (error) {
            console.error(error)
        }
    },[instance])

    const destroy = useCallback(() => {
        if(instance){
            instance.teardown()
            setInstance(null)
            setIsLoading(true)
            setError(null)
            setServerUrl(null)
        }
    },[instance])

    return {serverUrl,isLoading,error,instance,writeFileSync,destroy}
}
