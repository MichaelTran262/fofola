package cz.mzk.fofola.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateVcRequest {
    private String nameCz;
    private String nameEn;
    private String descriptionCz;
    private String descriptionEn;
}
