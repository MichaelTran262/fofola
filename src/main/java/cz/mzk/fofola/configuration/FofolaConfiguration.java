package cz.mzk.fofola.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FofolaConfiguration {

    @Value("${FEDORA_HOST:http://localhost:8080/fedora}")
    private String fedoraHost;
    @Value("${FEDORA_USER:fedoraUser}")
    private String fedoraUser;
    @Value("${FEDORA_PSWD:fedoraPswd}")
    private String fedoraPswd;
    @Value("${SOLR_HOST:http://localhost:8983/solr/kramerius}")
    private String solrHost;
    @Value("${KRAMERIUS_HOST:http://localhost}")
    private String krameriusHost;
    @Value("${KRAMERIUS_USER:krameriusUser}")
    private String krameriusUser;
    @Value("${KRAMERIUS_PSWD:krameriusPswd}")
    private String krameriusPswd;

    public String getFedoraHost() {
        return fedoraHost;
    }

    public String getFedoraPswd() {
        return fedoraPswd;
    }

    public String getFedoraUser() {
        return fedoraUser;
    }

    public String getSolrHost() {
        return solrHost;
    }

    public String getKrameriusHost() {
        return krameriusHost;
    }

    public String getKrameriusUser() {
        return krameriusUser;
    }

    public String getKrameriusPswd() {
        return krameriusPswd;
    }
}
