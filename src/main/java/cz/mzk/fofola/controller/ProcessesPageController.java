package cz.mzk.fofola.controller;

import cz.mzk.fofola.configuration.FofolaConfiguration;
import cz.mzk.fofola.model.vc.VC;
import cz.mzk.fofola.service.IpLogger;
import cz.mzk.fofola.service.VCUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
public class ProcessesPageController {

    private final FofolaConfiguration fofolaConfiguration;

    public ProcessesPageController(FofolaConfiguration fofolaConfiguration) {
        this.fofolaConfiguration = fofolaConfiguration;
    }

    @GetMapping("/link_vc")
    public String getVcLinkingPage(HttpServletRequest request, Model model) {
        IpLogger.logIp(request.getRemoteAddr(), "Entry VC linking section.");
        List<VC> vcList = VCUtils.getAllVC(fofolaConfiguration.getKrameriusHost());
        Map<String, String> vcNameUuid = VCUtils.mapAndSortVCs(vcList);
        model.addAttribute("vcList", vcNameUuid);
        return "link_vc";
    }

    @GetMapping("/perio-parts-publish")
    public String getPerioPartsPublishingPage(HttpServletRequest request) {
        IpLogger.logIp(request.getRemoteAddr(), "Entry private periodical parts publishing section.");
        return "perio_parts_publishing";
    }

    @GetMapping("/link-donator")
    public String getDonatorLinkingPage(HttpServletRequest request) {
        IpLogger.logIp(request.getRemoteAddr(), "Entry donator linking section.");
        return "link_donator";
    }

    @GetMapping("/img-editing")
    public String getImgEditionPage(HttpServletRequest request) {
        IpLogger.logIp(request.getRemoteAddr(), "Entry image editing section.");
        return "img_editing";
    }
}
