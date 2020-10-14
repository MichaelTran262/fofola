package cz.mzk.fofola.service;

import cz.mzk.fofola.model.FedoraDocument;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;

import javax.xml.xpath.*;


@Service
public class XMLService {


    private static XPathExpression uuidXPath;
    private static XPathExpression accessibilityXPath;
    private static XPathExpression imageUrlXPath;
    private static XPathExpression titleXPath;
    private static XPathExpression modelXPath;
    private static XPathExpression createdDateXPath;
    private static XPathExpression modifiedDateXPath;
    private static XPathExpression childrenXPath;

    static {
        try {
            uuidXPath = compile(xpathForRelsExtField("itemID"));
            accessibilityXPath = compile(xpathForRelsExtField("policy"));
            imageUrlXPath = compile(xpathForRelsExtField("tiles-url"));
            titleXPath = compile(xpathForDcField("title"));
            modelXPath = compile(xpathForDcField("type"));
            createdDateXPath = compile(xPathForProperty("info:fedora/fedora-system:def/model#createdDate"));
            modifiedDateXPath = compile(xPathForProperty("info:fedora/fedora-system:def/view#lastModifiedDate"));
            childrenXPath = compile(xpathForDs("RELS-EXT") + "/*/*/*[starts-with(name(), 'has')][namespace-uri()='http://www.nsdl.org/ontologies/relationships#']/@*");
        } catch (XPathExpressionException e) {
            e.printStackTrace();
        }
    }

    public FedoraDocument parseFedoraDocument(Document doc) {
        doc.getDocumentElement().normalize();

        try {
            String uuid = uuidXPath.evaluate(doc);
            String title = titleXPath.evaluate(doc);
            String model = modelXPath.evaluate(doc);
            String imageUrl = imageUrlXPath.evaluate(doc);
            String accessibility = accessibilityXPath.evaluate(doc);
            String lastModDateStr = modifiedDateXPath.evaluate(doc);

            model = model.replace("model:", "");
            accessibility = accessibility.replace("policy:", "");
            imageUrl = imageUrl.isEmpty() ? "no image" : imageUrl + "/big.jpg";

            FedoraDocument fedoraDoc = new FedoraDocument(uuid);
            fedoraDoc.setTitle(title);
            fedoraDoc.setModel(model);
            fedoraDoc.setAccesibility(accessibility);
            fedoraDoc.setImageUrl(imageUrl);
            fedoraDoc.setModifiedDateStr(lastModDateStr);

            NodeList childAttrs = (NodeList) childrenXPath.evaluate(doc, XPathConstants.NODESET);
            for (int i = 0; i < childAttrs.getLength(); i++) {
                Attr attr = (Attr) childAttrs.item(i);
                String childUuid = attr.getValue().replace("info:fedora/", "");
                fedoraDoc.addChild(childUuid);
            }

            return fedoraDoc;
        } catch (XPathExpressionException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static XPathExpression compile(String expression) throws XPathExpressionException {
        XPath xPath = XPathFactory.newInstance().newXPath();
        return xPath.compile(expression);
    }

    private static String xpathForDcField(String fieldName) {
        return xpathForDs("DC") + "/*/*[local-name() = '" + fieldName + "']/text()";
    }

    private static String xpathForRelsExtField(String fieldName) {
        return xpathForDs("RELS-EXT") + "/*/*/*[local-name() = '" + fieldName + "']/text()";
    }

    private static String xpathForDs(String ds) {
        return "//*/*[local-name() = 'datastream'][@ID='" + ds + "']/*[local-name() = 'datastreamVersion'][last()]/*";
    }

    private static String xPathForProperty(String propertyName) {
        return "//*/*[local-name() = 'objectProperties']/*[local-name() = 'property'][@NAME=\"" + propertyName + "\"]/@VALUE";
    }
}
